import {Bill} from "../../Bill/schema/bill.schema";

export class CompanyDto {
    readonly name: string
    readonly bills: Bill[] | null
}