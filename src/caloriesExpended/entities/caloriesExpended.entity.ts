import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Date, HydratedDocument, ObjectId, ObjectIdSchemaDefinition } from 'mongoose';
import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { User } from 'src/users/entities/user.entity';

@Schema({timestamps: true})
export class CaloriesExpended{


    @Prop({type : Date})
    createdAt : Date;

    @ApiProperty({example: '171.45'})
    @Prop()
    calories : number; 
    
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    user : User;

}

export type CaloriesExpendedDocumet = HydratedDocument<CaloriesExpended>;

export const CaloriesExpendedSchema = SchemaFactory.createForClass(CaloriesExpended);

CaloriesExpendedSchema.plugin(mongoosePaginate);

CaloriesExpendedSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret){
        ret.id = ret._id.toString();
        delete ret._id;
    },
});