import {bankNames, IMetaResponse, statusCard} from '../../../types';

export interface ICard {
    bankName: bankNames;
    num: string;
    data: string;
    id: number;
    sum: number;
    profit: number;
    status: statusCard
}

export interface ICommonDataPayments {
    payments: number
    turnover: string;
    income: string;
    onPayment: number;
    frozen: number;
}

export interface IPayments {
    loading?: boolean;
    cards: ICard[],
    meta: IMetaResponse;
    commonData: ICommonDataPayments
}
