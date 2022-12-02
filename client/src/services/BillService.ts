import to from "await-to-js";
import axios from "axios";
import {APPLICATION_HOST_URL} from "../shared/config";

export interface ICompany {
    _id: string;
    name: string;
}

export interface BillDB {
    _id: string;
    name: string;
    amount: number;
    currency: string;
    status: Date | null | string;
    company: ICompany;
    createdAt: string;
    updatedAt: string;
}

export class BillService {

    async getBills(): Promise<BillDB[]> {
        const [err, response] = await to(axios.get(
            APPLICATION_HOST_URL + '/api/bills/'
        ));
        if (err) throw err;

        return response.data.bills;
    }

    async getBillById(id: string): Promise<BillDB> {
        const [err, response] = await to(axios.get(
            APPLICATION_HOST_URL + '/api/bills/' + id
        ));
        if (err) throw err;

        console.log({response})

        return response.data;
    }

    async createBill(data: Partial<BillDB>): Promise<BillDB> {
        const [err, response] = await to(axios.post(
            APPLICATION_HOST_URL + '/api/bills',
            data
        ));
        if (err) throw err;

        console.log({response})

        return response.data;
    }

    async updateBill(id: string, data: Partial<BillDB>): Promise<BillDB> {
        const [err, response] = await to(axios.put(
            APPLICATION_HOST_URL + '/api/bills/' + id,
            data
        ));
        if (err) throw err;

        console.log({response})

        return response.data;
    }


    async deleteOrder(id: string){
        const [err, response] = await to(axios.delete(
            APPLICATION_HOST_URL + `/api/bills/` + id
        ));
        if (err) throw err;

        console.log({response})

        return response.data;
    }

}