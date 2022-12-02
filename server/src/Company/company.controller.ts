import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { CompanyService } from "./company.service";
import { CompanyDto } from "./dto/company.dto";
import {ValidateObjectId} from "../shared/validate-object-id";

@Controller('api/companies')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Post('/')
    async createCompany(@Res() res, @Body() companyDto: CompanyDto) {
        const createdCompany = await this.companyService.createCompany(companyDto);
        return res.status(200).send({
            success: 'true',
            company: createdCompany,
            "message" : "New company successfully added"
        });
    }

    @Get('/:companyID')
    async getCompany(@Res() res, @Param('companyID', new ValidateObjectId()) companyID) {
        const company = await this.companyService.getCompany(companyID);

        if(!company) {
            res.status(404).send({
                "success": false,
                "message": "Company not found"
            });
            return;
        }


        res.status(200).send({
            success: 'true',
            company: company,
        });
    }

    @Get('/')
    async getAllCompanies(@Res() res) {
        const companies = await this.companyService.getAllCompanies();
        return res.status(200).send({
            success: 'true',
            companies: companies
        });
    }

    @Put('/:companyID')
    async updateCompany(@Res() res, @Param('companyID', new ValidateObjectId()) companyID, @Body() companyDto: CompanyDto) {
        const editedCompany = await this.companyService.updateCompany(companyID, companyDto);

        if (!editedCompany) {
            res.status(404).send({
                "success": false,
                "message": "Company not found"
            });
            return;
        }

        return res.status(200).send({
            success: 'true',
            company: editedCompany,
            message: 'Company has been successfully updated'
        });
    }

    @Delete('/:companyID')
    async deleteCompany(@Res() res, @Param('companyID', new ValidateObjectId()) companyID) {
        const deletedCompany = await this.companyService.deleteCompany(companyID);

        if (!deletedCompany) {
            res.status(404).send({
                "success": false,
                "message": "Company not found"
            });
            return;
        }

        return res.status(200).send({
            success: 'true',
            company: deletedCompany,
            message: 'Company has been deleted'
        });
    }
}
