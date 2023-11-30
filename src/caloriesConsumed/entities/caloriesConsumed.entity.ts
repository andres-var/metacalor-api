import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Dish } from 'src/dishes/entities/dish.entity';
import { Aliment } from 'src/aliments/entities/aliment.entity';
import { User } from 'src/users/entities/user.entity';
import { Macronutrients } from 'src/macronutrients/entities/macronutrients.entity';

@Schema({ timestamps: true })
export class CaloriesConsumed {
  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }] })
  dish: Dish[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aliment' }] })
  aliments: Aliment[];

  @Prop()
  macronutrients: Macronutrients;

  @ApiProperty({ example: '345.79' })
  @Prop()
  calories: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
  user: User;
}
export type CaloriesConsumedDocument = HydratedDocument<CaloriesConsumed>;

export const CaloriesConsumedSchema =
  SchemaFactory.createForClass(CaloriesConsumed);

CaloriesConsumedSchema.plugin(mongoosePaginate);

CaloriesConsumedSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret.id;
  },
});
