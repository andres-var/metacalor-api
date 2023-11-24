import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCaloriesConsumedDto } from './dto/create-caloriesConsumed.dto';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CaloriesConsumed } from './entities/caloriesConsumed.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CaloriesConsumedService {
  constructor(
    @InjectModel(CaloriesConsumed.name)
    private readonly caloriesConsumedModel: PaginateModel<CaloriesConsumed>,
  ) {}

  private readonly logger = new Logger(CaloriesConsumedService.name);

  async create(
    createCaloriesConsumedDto: CreateCaloriesConsumedDto,
    user: User,
  ): Promise<CaloriesConsumed> {
    try {
      const caloriesConsumed = new this.caloriesConsumedModel({
        ...createCaloriesConsumedDto,
        user,
      });
      await caloriesConsumed.save();
      return caloriesConsumed;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(page: number, limit: number): Promise<any> {
    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    return await this.caloriesConsumedModel.paginate({}, options);
  }
}
