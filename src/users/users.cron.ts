import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';

import { CaloriesConsumed } from 'src/caloriesConsumed/entities/caloriesConsumed.entity';
import { CaloriesExpended } from 'src/caloriesExpended/entities/caloriesExpended.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersCron {
  constructor(
    @InjectModel(CaloriesConsumed.name)
    private readonly caloriesConsumedModel: Model<CaloriesConsumed>,
    @InjectModel(CaloriesExpended.name)
    private readonly caloriesExpendedModel: Model<CaloriesExpended>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  private SCORE = 100;
  private MARGIN_ERROR = 0.5;

  async findCalories(user: User) {
    const start = dayjs().startOf('day').toDate();
    const end = dayjs().endOf('day').toDate();

    const caloriesConsumed = await this.caloriesConsumedModel.find({
      user: user.id,
      createdAt: { $gte: start, $lte: end },
    });

    const caloriesExpended = await this.caloriesExpendedModel.find({
      user: user.id,
      createdAt: { $gte: start, $lte: end },
    });

    let totalCaloriesConsumed = 0;
    let totalCaloriesExpended = 0;

    if (caloriesConsumed.length > 0) {
      totalCaloriesConsumed = caloriesConsumed.reduce(
        (a, b) => a + b.calories,
        0,
      );
    }

    if (caloriesExpended.length > 0) {
      totalCaloriesExpended = caloriesExpended.reduce(
        (a, b) => a + b.calories,
        0,
      );
    }

    return {
      totalCaloriesConsumed,
      totalCaloriesExpended,
    };
  }

  async calculateScore(user: User) {
    const { totalCaloriesConsumed, totalCaloriesExpended } =
      await this.findCalories(user);

    const desiredCalorieConsumption = user.desiredCalorieConsumption;
    const total = totalCaloriesConsumed - totalCaloriesExpended;

    const error = desiredCalorieConsumption * this.MARGIN_ERROR;
    const maxError = desiredCalorieConsumption + error;
    const minError = desiredCalorieConsumption - error;

    let score = 0;

    if (total >= minError && total <= maxError) score = this.SCORE;

    return score;
  }

  async updateScore() {
    const users = await this.userModel.find();

    for (const user of users) {
      const score = await this.calculateScore(user);

      if (score > 0) {
        await user.save();
        console.log('Score updated for user: ', user.id);
      }
    }
  }

  async updateStreak() {
    const users = await this.userModel.find();

    for (const user of users) {
      const { totalCaloriesConsumed, totalCaloriesExpended } =
        await this.findCalories(user);

      const desiredCalorieConsumption = user.desiredCalorieConsumption;
      const total = totalCaloriesConsumed - totalCaloriesExpended;

      const error = desiredCalorieConsumption * this.MARGIN_ERROR;
      const maxError = desiredCalorieConsumption + error;
      const minError = desiredCalorieConsumption - error;

      if (total >= minError && total <= maxError) {
        user.streak += 1;
        await user.save();
      } else {
        user.streak = 0;
        await user.save();
      }
    }
  }

  @Cron('59 23 * * *')
  async handleCron() {
    await this.updateScore();
    await this.updateStreak();
  }
}
