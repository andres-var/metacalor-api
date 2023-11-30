import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Auth } from 'src/auth/decorators';
import { CaloriesConsumed } from 'src/caloriesConsumed/entities/caloriesConsumed.entity';
import { User } from 'src/users/entities/user.entity';

@Auth()
@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(CaloriesConsumed.name)
    private caloriesConsumedModel: Model<CaloriesConsumed>,
  ) {}
  async findAll(user: User) {
    const startWeek = dayjs().startOf('week').toDate();
    const endWeek = dayjs().endOf('week').toDate();

    const caloriesConsumed = await this.caloriesConsumedModel
      .find({
        createdAt: {
          $gte: startWeek,
          $lt: endWeek,
        },
        user: user.id,
      })
      .populate('aliments')
      .populate({ path: 'dish', populate: { path: 'aliments' } })
      .exec();

    const caloriesConsumedWithCalories =
      this.calculateCaloriesConsumed(caloriesConsumed);

    const caloriesConsumedGroupByDay = this.groupByDay(
      caloriesConsumedWithCalories,
    );

    return caloriesConsumedGroupByDay;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  groupByDay(caloriesConsumed: CaloriesConsumed[]) {
    const startWeek = dayjs().startOf('week').toDate();
    const days = Array.from({ length: 7 }, (_, i) =>
      dayjs(startWeek).add(i, 'day').format('YYYY-MM-DD'),
    );

    const caloriesConsumedGroupByDay = days.reduce((acc, cur) => {
      acc[cur] = [];
      return acc;
    }, {});

    caloriesConsumed.forEach((calorieConsumed) => {
      const day = dayjs(calorieConsumed.createdAt).format('YYYY-MM-DD');

      caloriesConsumedGroupByDay[day].push(calorieConsumed.calories);
    });

    const sumCaloriesConsumedGroupByDay = Object.keys(
      caloriesConsumedGroupByDay,
    ).reduce((acc, cur) => {
      acc[cur] = caloriesConsumedGroupByDay[cur].reduce(
        (acc, cur) => acc + cur,
        0,
      );
      return acc;
    }, {});

    return sumCaloriesConsumedGroupByDay;
  }

  calculateCaloriesConsumed(caloriesConsumed) {
    return caloriesConsumed.map((calorieConsumed) => {
      const caloriesAliments = calorieConsumed.aliments.reduce((acc, cur) => {
        return acc + cur.lipids * 9 + cur.carbohydrates * 4 + cur.protein * 4;
      }, 0);

      const caloriesDish = calorieConsumed.dish
        .map((dish) => {
          return dish.aliments.reduce((acc, cur) => {
            return (
              acc + cur.lipids * 9 + cur.carbohydrates * 4 + cur.protein * 4
            );
          }, 0);
        })
        .reduce((acc, cur) => acc + cur, 0);

      return {
        createdAt: calorieConsumed.createdAt,
        calories: +(caloriesAliments + caloriesDish).toFixed(2),
      };
    });
  }
}
