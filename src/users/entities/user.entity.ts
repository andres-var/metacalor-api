import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ id: true, timestamps: true })
export class User {
  @Prop({ type: mongoose.Types.ObjectId })
  id: string;

  @ApiProperty({ example: 'Jhon' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'Doe' })
  @Prop()
  lastName: string;

  @ApiProperty({ example: 'jhon@gmail.com' })
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ default: false })
  isAccountVerified: boolean;

  @ApiProperty({ example: '2021-01-01' })
  @Prop({ required: true })
  birthday: Date;

  @ApiProperty({ example: 'male' })
  @Prop({ required: true })
  gender: string;

  @ApiProperty({ example: 1.65 })
  @Prop({ required: true })
  height: number;

  @ApiProperty({ example: 60.9 })
  @Prop({ required: true })
  weight: number;

  @ApiProperty({ example: 22.4 })
  @Prop({ required: true })
  imc: number;

  @ApiProperty({ example: 'admin' })
  @Prop({ required: false, default: '' })
  avatar: string;

  @ApiProperty({ example: 22.4 })
  @Prop({ required: true })
  desiredCalorieConsumption: number;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
