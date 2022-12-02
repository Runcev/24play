import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import {Bill} from "../../Bill/schema/bill.schema";

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps : true })
export class Company {

    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Bill.name }] })
    bills: Bill[]
}

export const CompanySchema = SchemaFactory.createForClass(Company);