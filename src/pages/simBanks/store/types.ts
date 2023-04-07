import {IMetaResponse} from '../../../types';

export type CellPhoneSimBankStatus = 'active' | 'inactive'

export interface ICellPhoneSimBank {
    id: number;
    cellPhone: string;
    status: CellPhoneSimBankStatus
}

export interface ISimBank {
    id: number;
    name: string;
    create_as: string;
    redirectMail: string;
    confirmationCode: string;
    cellPhones: ICellPhoneSimBank[];
}

export interface ISimBankStore {
    loading?: boolean;
    list: ISimBank[];
    meta: IMetaResponse;
}

