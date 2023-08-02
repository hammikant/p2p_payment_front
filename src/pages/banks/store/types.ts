import {BankNames, IMetaResponse} from '../../../types';

export interface IVerificationData {
    cellPhone: string;
    comment: string;
}

export interface IBank {
    id: number;
    name: string;
    bank: BankNames;
    simBankCellPhone: string;
    cards: string | null;
    isVerified: boolean;
    isAcceptingSbp: boolean;
    isAcceptingPayments: boolean;
    create_as: string;
    verificationData: IVerificationData | null;
}

export interface IBanks {
    loading?: boolean;
    list: IBank[];
    meta: IMetaResponse;
}
