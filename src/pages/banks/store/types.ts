import {BankNames, IMetaResponse} from '../../../types';

export interface IVerificationData {
    cellPhone: string;
    comment: string;
}

export interface IBank {
    id: number;
    name: string;
    bankName: BankNames
    simBankCellPhone: string;
    cards: string | null;
    verification: boolean;
    sbp: boolean;
    isAcceptingPayments: boolean;
    create_as: string;
    verificationData: IVerificationData | null
}

export interface IBanks {
    loading?: boolean;
    list: IBank[];
    meta: IMetaResponse;
}
