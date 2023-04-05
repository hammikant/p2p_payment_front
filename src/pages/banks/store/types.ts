import {BankNames, IMetaResponse} from '../../../types';


export interface IBank {
    id: number;
    name: string;
    bankName: BankNames
    cards: string | null;
    verification: boolean;
    spb: boolean;
    acceptingPayments: boolean;
    create_as: string;
}

export interface IBanks {
    loading?: boolean;
    list: IBank[];
    meta: IMetaResponse;
}
