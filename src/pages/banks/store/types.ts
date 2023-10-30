import {  BankNames, IMetaResponse} from '../../../types';

export interface IVerificationData {
    cellPhone: string;
    verificationAmount: string | null;
    verificationComment: string | null
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
    isVerified: boolean;
    verificationAmount: string | null;
    verificationComment: string | null;
}

export interface IBanks {
    loading?: boolean;
    isUseFilter: boolean;
    list: IBank[];
    numbers: string[]
    meta: IMetaResponse;
}

export interface IBankRequest {

}
