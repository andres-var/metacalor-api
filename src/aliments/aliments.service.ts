import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { Aliment } from './entities/aliment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AlimentsService {
  constructor(
    @InjectModel(Aliment.name) private alimentModel: Model<Aliment>,
  ) {}

  private readonly logger = new Logger(AlimentsService.name);

  async create(createAlimentDto: CreateAlimentDto) {
    try {
      const aliment = new this.alimentModel({
        ...createAlimentDto,
      });

      await aliment.save();

      return aliment;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all aliments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aliment`;
  }

  remove(id: number) {
    return `This action removes a #${id} aliment`;
  }
}
