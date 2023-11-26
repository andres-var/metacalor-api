import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './entities/dish.entity';
import { User } from 'src/users/entities/user.entity';
import * as dishesJson from './data/dishes.json';
@Injectable()
export class DishesService {
  constructor(
    //Inyecta el modelo Dish para poder interactuar con la BD
    @InjectModel(Dish.name) private readonly dishModel: PaginateModel<Dish>,
  ) {}
  //Crea un objeto Logger para registrar mensajes de información en la aplicación
  private readonly logger = new Logger(DishesService.name);

  async create(createDishDto: CreateDishDto, user: User): Promise<Dish> {
    try {
      const dish = new this.dishModel({
        ...createDishDto,
        user,
      });

      await dish.save();
      return dish;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async createDefaultDishes(userId: string): Promise<void> {
    try {
      const dishes = dishesJson.map((dish) => ({
        ...dish,
        user: userId,
      }));

      await this.dishModel.insertMany(dishes);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  //Devuelve todos los documentos de la colección de Mongoose
  async findAll(page: number, limit: number) {
    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    const dishes = await this.dishModel.paginate({}, options);
    return dishes;
  }

  async findOne(id: string): Promise<Dish> {
    const dish = await this.dishModel.findById(id).populate('aliments').exec();

    if (!dish) {
      throw new NotFoundException({
        key: 'dishes',
        message: 'Dish not found',
      });
    }
    return dish;
  }

  async findOneByName(name: string): Promise<string> {
    const dish = await this.dishModel.findOne({ name: name }).exec();

    if (!dish) {
      throw new NotFoundException({
        key: 'dishes',
        message: 'Dish not found',
      });
    }

    return dish._id.toString();
  }

  async update(id: string, updateDishDto: UpdateDishDto): Promise<Dish> {
    try {
      const dish = await this.dishModel.findByIdAndUpdate(
        id,
        { ...updateDishDto },
        { new: true },
      );
      return dish;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const result = await this.dishModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Dish with id ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
