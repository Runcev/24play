import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Company} from "../../Company/schema/company.schema";
import * as mongoose from "mongoose";

export type BillDocument = HydratedDocument<Bill>;

@Schema({timestamps : true})
export class Bill {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    amount: number

    @Prop({required: true})
    currency: string

    @Prop({require: true, default: null })
    status: Date | null

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
    company: Company
}

export const BillSchema = SchemaFactory.createForClass(Bill);