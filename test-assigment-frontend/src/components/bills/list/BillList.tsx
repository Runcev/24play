import * as React from 'react';
import to from "await-to-js";
import {useEffect, useMemo, useState} from "react";
import {Button, IconButton,} from "@mui/material";
import {Delete} from "@mui/icons-material";
import MUIDataTable, { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import {BillDB, BillService} from "../../../services/BillService";
import './BillList.css'
import {CreateBill} from "../CreateBill";


const BillList = () => {

    const billService = new BillService();

    const [bills, setBills] = useState<BillDB[]>([]);

    useEffect(() => {
        (async () => {
            await getBills();
        })()
    }, []);

    const handlePaid = async (index: number ) => {
        await billService.updateBill(bills[index]._id, {status: ""})
    }

    const deleteBill = async (id: string) => {
        await billService.deleteOrder(id);
    }

    const getBills = async () => {
        const [err, bills] = await to<BillDB[]>(billService.getBills());
        if (err) throw err;

        setBills(bills || [])
    }


    const tableColumns: MUIDataTableColumn[] = [
        {
            name: '_id',
            label: 'ID',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'amount',
            label: 'Amount',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'currency',
            label: 'Currency',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'state',
            label: 'Status',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: dataIndex => {
                    const status = bills[dataIndex].status;
                    if (status === null) return (<Button sx={{width: '150px'}} variant="contained" onClick={async () => {
                        await handlePaid(dataIndex);
                        await getBills();
                    }}>Not paid yet</Button>)

                    const date = new Date(status);

                    return (<span>{date.toLocaleTimeString()} | {date.toLocaleDateString()}</span>)
                }
            }
        },
        {
            name: 'company',
            label: 'Company',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: dataIndex => bills[dataIndex]?.company?.name
            }
        },
        {
            name: 'createdAt',
            label: 'Created At',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: dataIndex => {
                    const createdAt = bills[dataIndex].createdAt;
                    if (!createdAt) return (<span>-</span>)

                    const date = new Date(createdAt);

                    return (<span>{date.toLocaleTimeString()} | {date.toLocaleDateString()}</span>)
                }
            }
        },
        {
            name: 'updatedAt',
            label: 'Updated At',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: dataIndex => {
                    const updatedAt = bills[dataIndex].updatedAt;
                    if (!updatedAt) return (<span>-</span>)

                    const date = new Date(updatedAt);

                    return (<span>{date.toLocaleTimeString()} | {date.toLocaleDateString()}</span>)
                }
            }
        },
        {
            name: 'actions',
            label: 'Actions',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <div className='d-flex'>
                            <IconButton onClick={async () => {
                                await deleteBill(bills[dataIndex]._id);
                                await getBills();
                            }}>
                                <Delete fontSize={'large'}/>
                            </IconButton>
                        </div>
                    );
                }
            }
        }
    ]

    const tableOptions: MUIDataTableOptions =
        {
            selectableRowsHeader: true,
            rowsPerPage: 6,
            rowsPerPageOptions: [6, 10, 15, 20, 25, 50],
            filterType: "multiselect",
        };

    const tableData = useMemo(() => bills.map((bill) => ({ ...bill, company: bill.company.name })), [bills]);

    return (
        <>
            <CreateBill onFinish={getBills}/>
            <div className="bill-list-container">
                <div className='bills-table'>
                    <MUIDataTable
                        title={'Bills List'}
                        data={tableData || []}
                        columns={tableColumns}
                        options={tableOptions}/>
                </div>
            </div>
        </>
    );
}

export default BillList