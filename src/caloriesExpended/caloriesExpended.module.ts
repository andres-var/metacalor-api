import { Module } from "@nestjs/common";
import { CaloriesExpendedController } from "./caloriesExpended.controller";
import { CaloriesExpendedService } from "./caloriesExpended.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CaloriesExpended, CaloriesExpendedSchema } from "./entities/caloriesExpended.entity";


@Module({
    controllers: [CaloriesExpendedController],
    providers: [CaloriesExpendedService],
    imports: [MongooseModule.forFeature([{name: CaloriesExpended.name, schema: CaloriesExpendedSchema}])]
})
export class CaloriesExpendedModule{}