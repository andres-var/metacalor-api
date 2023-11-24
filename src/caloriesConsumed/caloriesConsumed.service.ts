import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    ParseIntPipe
} from '@nestjs/common';
import { CreateCaloriesConsumedDto } from './dto/create-caloriesConsumed.dto';
import {Model, PaginateModel} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CaloriesConsumed } from './entities/caloriesConsumed.entity';
import { User } from 'src/users/entities/user.entity';
import { DishesService } from 'src/dishes/dishes.service';
import { AlimentsService } from 'src/aliments/aliments.service';
import { CreateDishDto } from 'src/dishes/dto/create-dish.dto';
import { ParseObjectIdPipe } from 'src/common/pipes';

@Injectable()
export class CaloriesConsumedService{
    constructor(
        @InjectModel(CaloriesConsumed.name) private readonly caloriesConsumedModel: PaginateModel<CaloriesConsumed>,
        private dishesService: DishesService,
        private alimentService: AlimentsService,
    ){}

    private readonly logger = new Logger(CaloriesConsumedService.name);

    async create(createCaloriesConsumedDto: CreateCaloriesConsumedDto, user: User): Promise <CaloriesConsumed>{
        try{
            const caloriesConsumed = new this.caloriesConsumedModel({
                ...createCaloriesConsumedDto,
                user,
            });
            await caloriesConsumed.save();
            return caloriesConsumed;
        }catch(error){
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

    async findAll(page: number, limit:number): Promise<any>{
        const options = {
            page: page || 1,
            limit:limit ||10, 
        };

        return await this.caloriesConsumedModel.paginate({}, options);
    }
}