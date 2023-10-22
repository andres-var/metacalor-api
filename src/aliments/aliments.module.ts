import { Module } from '@nestjs/common';
import { AlimentsService } from './aliments.service';
import { AlimentsController } from './aliments.controller';
import { Aliment, AlimentSchema } from './entities/aliment.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AlimentsController],
  providers: [AlimentsService],
  imports: [
    MongooseModule.forFeature([{ name: Aliment.name, schema: AlimentSchema }]),
  ],
  exports: [AlimentsService],
})
export class AlimentsModule {}
