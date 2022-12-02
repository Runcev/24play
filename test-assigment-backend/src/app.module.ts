import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CompanyModule} from "./Company/company.module";
import {BillModule} from "./Bill/bill.module";


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/24play-test', { useNewUrlParser: true }),
    CompanyModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
