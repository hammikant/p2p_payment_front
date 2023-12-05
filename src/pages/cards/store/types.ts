import {bankNames, IMetaResponse} from '../../../types';
import {StatusCard} from '../components/TableItem';

export interface ICard {
    id: number;
    bank: bankNames
    number: number;
    updatedAt: string;
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
    handlePlay: (status: string) => void;
}
