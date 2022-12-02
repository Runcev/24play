import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import {BillService} from "./bill.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Bill, BillSchema} from "./schema/bill.schema";
import {Company, CompanySchema} from "../Company/schema/company.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Bill.name, schema: BillSchema}, {name: Company.name, schema: CompanySchema}]),
    ],
    providers: [BillService],
    controllers: [BillController]
})
export class BillModule {}