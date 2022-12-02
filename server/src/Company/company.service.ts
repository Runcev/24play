import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Company, CompanyDocument} from "./schema/company.schema";
import {CompanyDto} from './dto/company.dto';


@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>
    ) { }

    async createCompany(companyDto: CompanyDto): Promise<Company> {
        const newCompany = await this.companyModel.create(companyDto);
        return newCompany.save();
    }

    async getCompany(companyID): Promise<Company> {
        return await this.companyModel
            .findById(companyID)
            .populate("bills")
            .exec();
    }

    async getAllCompanies(): Promise<Company[]> {
        return await this.companyModel
            .find()
            .populate("bills")
            .exec();
    }

    async updateCompany(companyID, companyDto: Partial<CompanyDto>): Promise<Company> {
        return this.companyModel.findByIdAndUpdate(companyID, companyDto, {new: true});
    }

    async deleteCompany(companyID): Promise<any> {
        return this.companyModel.findByIdAndRemove(companyID);
    }
}