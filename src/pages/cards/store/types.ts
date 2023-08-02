import {bankNames, IMetaResponse} from '../../../types';

export interface ICard {
    bank: bankNames;
    number: string;
    date: string;
    id: number;
    status?: 'Активна' | 'Не активна' | 'На паузе'
}

export interface IConnectCard {
    cards: string,
    id: number,
}

export interface ICards {
    loading?: boolean;
    cards: ICard[];
    meta: IMetaResponse
}

export interface ISwitchCardStatusProps {
    status: 'Активна' | 'Не активна' | 'На паузе'
    handlePause: () => void;
    handleStop: () => void;
    handlePlay: () => void;
}
