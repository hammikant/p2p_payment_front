import {  BankNames, IMetaResponse} from '../../../types';

export interface IVerificationData {
    cellPhone: string;
    comment: string;
}

export interface IBank {
    accountNumber: string;
    bank: BankNames
    cards: number;
    id: number;
    isAcceptingPayments: boolean;
    isAcceptingSbp: boolean;
    name: string;
    phoneNumber: string;
    verification: boolean;
}

export interface IBanks {
    loading?: boolean;
    list: IBank[];
    meta: IMetaResponse;
}
