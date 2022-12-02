import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Bill, BillDocument} from "./schema/bill.schema";
import {BillDto} from "./dto/bill.dto";
import {Company, CompanyDocument} from "../Company/schema/company.schema";

@Injectable()
export class BillService {
    constructor(
        @InjectModel(Bill.name) private readonly billModel: Model<BillDocument>,
        @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>
    ) { }

    async createBill(billDto: BillDto): Promise<Bill> {
        const newBill = await this.billModel.create(billDto);

        await this.companyModel.findByIdAndUpdate(newBill.company,
            { $push: { bills: newBill._id } },
            { new: true, useFindAndModify: false })

        return newBill.save();
    }

    async getBill(billID): Promise<Bill> {
        return await this.billModel
            .findById(billID)
            .populate("company")
            .exec();
    }

    async getAllBills(): Promise<Bill[]> {
        return await this.billModel
            .find()
            .populate("company")
            .exec();

    }

    async updateBill(billID, billDto: Partial<BillDto>): Promise<Bill> {
        if(billDto.status != null){
            billDto.status = new Date();
        }
        return this.billModel.findByIdAndUpdate(billID, billDto, {new: true});
    }

    async deleteBill(billID): Promise<any> {
        return this.billModel.findByIdAndRemove(billID);
    }
}
