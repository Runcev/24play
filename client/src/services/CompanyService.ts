import to from "await-to-js";
import axios from "axios";
import {APPLICATION_HOST_URL} from "../shared/config";
import {ICompany} from "./BillService";

export interface IBill {
    _id: string,
    name: string,
    amount: number,
    currency: string,
    company: ICompany,
}

export interface CompanyDB {
    _id: string;
    name: string;
    bills: IBill[];
    createdAt: string;
    updatedAt: string;
}

export class CompanyService {

    async getCompanies(): Promise<CompanyDB[]> {
        const [err, response] = await to(axios.get(
            APPLICATION_HOST_URL + '/api/companies/'
        ));
        if (err) throw err;

        return response.data.companies;
    }

    async getCompanyById(id: string): Promise<CompanyDB> {
        const [err, response] = await to(axios.get(
            APPLICATION_HOST_URL + '/api/companies/' + id
        ));
        if (err) throw err;

        console.log({response})

        return response.data;
    }

    async createCompany(data: Partial<CompanyDB>): Promise<CompanyDB> {
        const [err, response] = await to(axios.post(
            APPLICATION_HOST_URL + '/api/companies',
            data
        ));
        if (err) throw err;

        console.log({response})

        return response.data;
    }

    async updateCompany(id: string, data: Partial<CompanyDB>): Promise<CompanyDB> {
        const [err, response] = await to(axios.put(
            APPLICATION_HOST_URL + '/api/companies/' + id,
            data
        ));
        if (err) throw err;

        console.log({response})

        return response.data;
    }


    async deleteCompany(id: string){
        const [err, response] = await to(axios.delete(
            APPLICATION_HOST_URL + `/api/companies/` + id
        ));
        if (err) throw err;

        console.log({response})

        return response.data;
    }

}