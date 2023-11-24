import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Reminder {
  @ApiProperty({ example: 'Hora de comer' })
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;

  @ApiProperty({ example: '13:00', description: 'Formato HH:MM' })
  hora: string;
}

//Documento de Mongoose con instancia de la clase Reminder
export type ReminderDocument = HydratedDocument<Reminder>;

//Crea un esquema de base de datos a partir de la clase Reminder
export const ReminderSchema = SchemaFactory.createForClass(Reminder);

ReminderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});
