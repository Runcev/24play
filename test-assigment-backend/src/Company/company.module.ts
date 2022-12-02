import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import {CompanyService} from "./company.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Company, CompanySchema} from "./schema/company.schema";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}])
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}