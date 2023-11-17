import { 
  Injectable,
  InternalServerErrorException,
  Logger, 
  NotFoundException
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './entities/dish.entity';
import { User } from 'src/users/entities/user.entity';
import { AlimentsService } from 'src/aliments/aliments.service';


@Injectable()
export class DishesService {
  constructor(
    //Inyecta el modelo Dish para poder interactuar con la BD 
    @InjectModel (Dish.name) private readonly dishModel: PaginateModel<Dish>,
    private alimentService: AlimentsService
  ){}
  //Crea un objeto Logger para registrar mensajes de información en la aplicación
  private readonly logger = new Logger(DishesService.name);


  async create(createDishDto: CreateDishDto, user: User): Promise <Dish> {
    try{
      const dish = new this.dishModel({
        ...createDishDto,
        user, 
      });

      await dish.save();
      return dish;

    }catch (error){
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  //Devuelve todos los documentos de la colección de Mongoose 
  async findAll(page: number, limit: number): Promise<any> {
    const options = {
      page: page || 1,
      limit: limit || 10,
    };
  
    return this.dishModel.paginate({}, options);
  }

  async findOne(id: string) :Promise<Dish> {
    const dish = await this.dishModel.findById(id).populate('aliments').exec();

    if(!dish){
      throw new NotFoundException({
        key: 'dishes',
        message: 'Dish not found',
      });
    }
    return dish;
  }

  async findOneByName (name: string): Promise<string> {
    const dish = await this.dishModel.findOne({name: name}).exec();
    
    if(!dish){
      throw new NotFoundException({
        key: 'dishes',
        message: 'Dish not found',
      });
    }

    return dish._id.toString();
  }

  
  async update(id: string, updateDishDto: UpdateDishDto): Promise <Dish> {
    try{
      const dish = await this.dishModel.findByIdAndUpdate(
        id,
        {... updateDishDto},
        {new: true},
        );
      return dish;
    }catch(error){
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<any> {
    try{
      return this.dishModel.deleteOne({_id:id}).exec();
    }catch(error){
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}