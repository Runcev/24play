import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CompanyModule} from "./Company/company.module";
import {BillModule} from "./Bill/bill.module";


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:admin@24play.lqbiojc.mongodb.net/24play?retryWrites=true&w=majority", { useNewUrlParser: true }),
    CompanyModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
