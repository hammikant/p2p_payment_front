import {IMetaResponse} from '../../../types';

export type CellPhoneSimBankStatus = 'active' | 'inactive'

export interface ICellPhoneSimBank {
    id: number;
    cellPhone: string;
    status: CellPhoneSimBankStatus
}

export interface ISimBank {
    apiKey: string;
    displayName: string;
    id: number;
    numbers: string[]
}

export interface ISimBankStore {
    loading?: boolean;
    simBanks: ISimBank[];
    meta: IMetaResponse;
}

