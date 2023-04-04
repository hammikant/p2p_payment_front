import {bankNames, IMetaResponse} from '../../../types';

export interface ICard {
    bankName: bankNames;
    num: string;
    data: string;
    id: number;
    bank: 'Не подключён' | 'Подключён';
    status: 'Активна' | 'Не активна' | 'На паузе'
}


export interface ICards {
    loading?: boolean;
    cards: ICard[];
    meta: IMetaResponse
}

export interface ISwitchCardStatusProps {
    handlePause: () => void;
    handleStop: () => void;
}
