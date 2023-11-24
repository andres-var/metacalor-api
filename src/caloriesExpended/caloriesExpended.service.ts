import { CreateCaloriesExpendedDto } from './dto/create-caloriesExpended.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CaloriesExpended } from './entities/caloriesExpended.entity';
import { User } from 'src/users/entities/user.entity';
import { Logger } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
@Injectable()
export class CaloriesExpendedService {
  constructor(
    @InjectModel(CaloriesExpended.name)
    private readonly caloriesExpendedModel: PaginateModel<CaloriesExpended>,
  ) {}

  private readonly logger = new Logger(CaloriesExpendedService.name);

  async create(
    createCaloriesExpendedDto: CreateCaloriesExpendedDto,
    user: User,
  ): Promise<CaloriesExpended> {
    try {
      const caloriesExpended = new this.caloriesExpendedModel({
        ...createCaloriesExpendedDto,
        user,
      });
      await caloriesExpended.save();
      return caloriesExpended;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(page: number, limit: number): Promise<any> {
    const options = {
      page: page || 1,
      limit: limit || 0,
    };
    return await this.caloriesExpendedModel.paginate({}, options);
  }
}
