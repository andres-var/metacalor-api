import { 
  Injectable,
  InternalServerErrorException,
  Logger, 
  NotFoundException
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './entities/dish.entity';
import { User } from 'src/users/entities/user.entity';
import { AlimentsService } from 'src/aliments/aliments.service';


@Injectable()
export class DishesService {
  constructor(
    //Inyecta el modelo Dish para poder interactuar con la BD 
    @InjectModel (Dish.name) private dishModel: Model<Dish>,
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
  async findAll(): Promise<Dish[]> {
    return this.dishModel.find().exec();
  }

  async findOne(id: string) :Promise<Dish> {
    const dish = await this.dishModel.findById(id, {
      aliments:true
    },{
      populate:['aliments']
    });

    if(!dish){
      throw new NotFoundException({
        key: 'dishes',
        message: 'Dish not found',
      });
    }
    return dish;
  }

  async findOneByName (name: string): Promise<Dish> {
    const dish = await this.dishModel.findOne({name});
    
    if(!dish){
      throw new NotFoundException({
        key: 'dishes',
        messgae: 'Dish not found',
      });
    }

    return dish;
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
      throw InternalServerErrorException;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }
}
