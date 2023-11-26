import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { Aliment } from './entities/aliment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { BaseQueryDto } from 'src/common/dto';

@Injectable()
export class AlimentsService {
  constructor(
    @InjectModel(Aliment.name) private alimentModel: PaginateModel<Aliment>,
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

  async findAll(baseQueryDto: BaseQueryDto<Aliment>) {
    return await this.alimentModel.paginate(
      { ...baseQueryDto.filters },
      {
        page: baseQueryDto.page,
        limit: baseQueryDto.limit,
        sort: baseQueryDto.sort,
      },
    );
  }

  async findOne(id: string) {
    return await this.alimentModel.findById(id);
  }
}
