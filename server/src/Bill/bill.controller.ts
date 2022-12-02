import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    Put,
    Query,
    Delete,
    Req
} from '@nestjs/common';
import { BillService } from "./bill.service";
import { BillDto } from "./dto/bill.dto";
import {ValidateObjectId} from "../shared/validate-object-id";

@Controller('api/bills')
export class BillController {
    constructor(private billService: BillService) {}

    @Post('/')
    async createBill(@Res() res, @Body() billDto: BillDto) {
        const createdBill = await this.billService.createBill(billDto);

        return res.status(200).send({
            success: 'true',
            bill: createdBill,
            "message" : "New bill successfully added"
        });
    }

    @Get('/:billID')
    async getBill(@Res() res, @Param('billID', new ValidateObjectId()) billID) {
        const bill = await this.billService.getBill(billID);

        if(!bill) {
            res.status(404).send({
                "success": false,
                "message": "Bill not found"
            });
            return;
        }


        res.status(200).send({
            success: 'true',
            bill: bill,
        });
    }

    @Get('/')
    async getAllBills(@Res() res) {
        const bills = await this.billService.getAllBills();
        return res.status(200).send({
            success: 'true',
            bills: bills
        });
    }

    @Put('/:billID')
    async updateBill(@Res() res, @Param('billID', new ValidateObjectId()) billID, @Body() billDto: BillDto) {
        const editedBill = await this.billService.updateBill(billID, billDto);

        if (!editedBill) {
            res.status(404).send({
                "success": false,
                "message": "Bill not found"
            });
            return;
        }

        return res.status(200).send({
            success: 'true',
            bill: editedBill,
            message: 'Bill has been successfully updated'
        });
    }

    @Delete('/:billID')
    async deleteBill(@Res() res, @Param('billID', new ValidateObjectId()) billID) {
        const deletedBill = await this.billService.deleteBill(billID);

        if (!deletedBill) {
            res.status(404).send({
                "success": false,
                "message": "Bill not found"
            });
            return;
        }

        return res.status(200).send({
            success: 'true',
            bill: deletedBill,
            message: 'Bill has been deleted'
        });
    }
}
