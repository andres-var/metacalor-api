import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; //define un esquema de bd de mongo
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Aliment } from 'src/aliments/entities/aliment.entity';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class Dish {
  @ApiProperty({ example: 'Tacos' })
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aliment' }] })
  aliments: Aliment[];
}

//Documento de Mongoose con instancia de la clase Dish
export type DishDocument = HydratedDocument<Dish>;

//Crea un esquema de base de datos a partir de la clase Dish
export const DishSchema = SchemaFactory.createForClass(Dish);

DishSchema.plugin(mongoosePaginate);

DishSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id?.toString();
    delete ret._id;
  },
});
