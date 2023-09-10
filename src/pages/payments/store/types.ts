import {bankNames, IMetaResponse, statusCard} from '../../../types';

export interface IPayments {
    amount: number;
    cardNumber: string;
    date: string;
    id: number;
    profit: number
    status: string;
}

export interface ICommonDataPayments {
    payments: number
    turnover: string;
    income: string;
    onPayment: number;
    frozen: number;
}

export interface IPaymentsState {
    loading?: boolean;
    payments: IPayments[],
    meta: IMetaResponse;
    commonData: ICommonDataPayments
}
