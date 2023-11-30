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
import { Aliment } from 'src/aliments/entities/aliment.entity';

@Injectable()
export class DishesService {
  constructor(
    //Inyecta el modelo Dish para poder interactuar con la BD
    @InjectModel(Dish.name) private readonly dishModel: PaginateModel<Dish>,
    @InjectModel(Aliment.name) private readonly alimentModel : PaginateModel<Aliment>
  ) {}
  //Crea un objeto Logger para registrar mensajes de información en la aplicación
  private readonly logger = new Logger(DishesService.name);

  async create(createDishDto: CreateDishDto, user: User): Promise<Dish> {
      try {
      /*for(const alimentID of createDishDto.aliments){
        const alimentExists= await this.alimentModel.exists({_id: alimentID});
      
        if(!alimentExists){
          throw new Error(`Aliment with Id ${alimentID} does not exist`);
        }
      }
      */
      const dish = new this.dishModel({
        ...createDishDto,
        user: user.id,
      });

      await dish.save();
      return dish;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  //Devuelve todos los documentos de la colección de Mongoose
  async findAll(page: number, limit: number, user: User) {
    const options = {
      page: page || 1,
      limit: limit || 10,
      user: user.id
    };

    const dishes = await this.dishModel.paginate({user: user.id}, options);
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
