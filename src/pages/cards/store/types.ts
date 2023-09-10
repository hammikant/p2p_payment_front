import {bankNames, IMetaResponse} from '../../../types';

export interface ICard {
    id: number;
    bank: bankNames
    number: number;
    date: string;
    status: string;
}

export interface IConnectCard {
    cardNumbers: string,
    bankAccountId: number,
}

export interface ICardsState {
    loading?: boolean;
    cards: ICard[];
    meta: IMetaResponse
}

export interface ISwitchCardStatusProps {
    status: string;
    handlePause: () => void;
    handleStop: () => void;
    handlePlay: () => void;
}
