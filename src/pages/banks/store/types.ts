import {  BankNames, IMetaResponse} from '../../../types';

export interface IVerificationData {
    cellPhone: string;
    comment: string;
    authorizationAmount: string | null
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
    authorizationComment: string | null;
    authorizationAmount: string | null;
}

export interface IBanks {
    loading?: boolean;
    isUseFilter: boolean;
    list: IBank[];
    meta: IMetaResponse;
}

export interface IBankRequest {

}
