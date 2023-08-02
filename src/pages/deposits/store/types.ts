import {IMetaResponse} from '../../../types';

export interface ICalculatorProps {
    exchangeRates: number;
    handleCalculation: (sum: number) => void;
}

export interface IDeposit {
    wallet: string;
    date: string;
    id: number;
    sumUSDT: string;
}

export interface IDeposits {
    loading?: boolean;
    meta: IMetaResponse;
    deposits: IDeposit[]
}
