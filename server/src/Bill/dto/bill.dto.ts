import {Company} from "../../Company/schema/company.schema";

export class BillDto {
    readonly name: string;
    readonly amount: number;
    readonly currency: string;
    public status: Date | null;
    readonly company: Company;
}