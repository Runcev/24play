import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";
import {AccountBalance, DriveFileRenameOutlineRounded, GroupsSharp, MonetizationOnSharp} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useState} from "react";
import to from "await-to-js";
import {BillService} from "../../services/BillService";
import {CompanyDB, CompanyService} from "../../services/CompanyService";

export const CreateBill = ({onFinish}: { onFinish: any}) => {

    const billService = new BillService();
    const companyService = new CompanyService();

    const currencyList = [
        'USD',
        'EUR',
    ]

    const [companiesList, setCompanies] = useState<CompanyDB[]>([]);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        name: '',
        amount: 0,
        currency: currencyList[0],
        company: ''
    });

    useEffect(() => {
        (async () => {
            await getCompanies();
        })()
    }, []);

    const getCompanies = async () => {
        const [err, companies] = await to<CompanyDB[]>(companyService.getCompanies());
        if (err) throw err;

        setCompanies(companies || []);
    }

    const onClickCreateBill = async () => {
        const [err, bill] = await to(billService.createBill({

                name: state.name,
                amount: state.amount,
                currency: state.currency,
                company: companiesList.find(({ _id }) => _id === state.company)
            }

        ));
        if (err) throw err;

        handleClose();
        onFinish();
    }

    const handleChange = (event: { target: { name: string; value: any; }; }) => {
        setState({
            ...state,
            [event.target.name as string]: event.target.value
        })
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setState({
            name: '',
            amount: 0,
            currency: currencyList[0],
            company: ''
        });
    }

    return (
        <>
            <div className="add-button">
                <Button className={"bill-add-button"} variant={"contained"} color={"success"}  onClick={handleOpen}>Add Bill</Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new bill</DialogTitle>
                <DialogContent className='bill-modal-content'>
                    <Stack className={'modal-bill-form'} spacing={2}>
                        <TextField
                            value={state.name}
                            onChange={handleChange}
                            name={'name'}
                            label={'Name'}
                            variant={'outlined'}
                            placeholder={'Input name'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DriveFileRenameOutlineRounded/>
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            value={state.amount}
                            onChange={handleChange}
                            name={'amount'}
                            label={'Amount'}
                            variant={'outlined'}
                            placeholder={'Input amount'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBalance/>
                                    </InputAdornment>
                                ),
                            }}/>
                        <TextField
                            value={state.currency}
                            onChange={handleChange}
                            select
                            name={'currency'}
                            label={'Currency'}
                            variant={'outlined'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MonetizationOnSharp/>
                                    </InputAdornment>
                                )
                            }}
                        >
                            {currencyList.length
                                ? currencyList.map((option) => <MenuItem key={option}
                                                                         value={option}>{option}</MenuItem>)
                                : null}
                        </TextField>
                        <TextField
                            value={state.company}
                            onChange={handleChange}
                            select
                            name={'company'}
                            label={'Company'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <GroupsSharp/>
                                    </InputAdornment>
                                )
                            }}
                        >
                            {companiesList.length
                                ? companiesList.map(company => <MenuItem key={company._id}
                                                                         value={company._id}>{company.name}</MenuItem>)
                                : null}
                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions className='bill-modal-actions'>
                    <Button className={"button"} color={'secondary'} variant={'contained'} onClick={handleClose}>Cancel</Button>
                    <Button className={"button"} variant={'contained'} onClick={onClickCreateBill}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}