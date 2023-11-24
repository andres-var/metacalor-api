import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class Aliment {
  @Prop()
  category: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  unit: string;

  @Prop()
  grossWeight: number;

  @Prop()
  net_weight: number;

  @Prop()
  energyKcal: number;

  @Prop()
  protein: number;

  @Prop()
  lipids: number;

  @Prop()
  carbohydrates: number;
}

export type AlimentDocument = HydratedDocument<Aliment>;

export const AlimentSchema = SchemaFactory.createForClass(Aliment);

AlimentSchema.plugin(mongoosePaginate);

AlimentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});
