import {Prop,Schema, SchemaFactory} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
@Schema({timestamps:true})
export class Macronutrients{

    /*
    id: ObjectId; 
    */
   
    @Prop()
    lipids: number;

    @Prop()
    proteins: number; 

    @Prop()
    carbohydrates: number; 
}

export type MacronutrientsDocument = HydratedDocument<Macronutrients>;

export const MacronutrientsSchema = SchemaFactory.createForClass(Macronutrients);

MacronutrientsSchema.set('toJSON', {
    virtuals : true,
    versionKey : true, 
    transform : function(doc, ret){
        ret.id = ret._id.toString();
        delete ret._id;
    },
});