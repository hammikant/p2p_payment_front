import {Role} from './hooks/useUserRole';

export interface IError {
    message: string;
    errors: {};
}

export interface ISuccess {
    message: string;
}

export interface IAlert {
    type: string;
    text: string;
}

export interface IMetaResponse {
    total: number;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
    isLastPage: boolean;
}

export const alertTypes = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error'
};

export interface IOption {
    label: string;
    value: string;
}

export const enum StatusCardPayments {
    success = 'Успех',
    frozen = 'Заморожено',
    payment = 'Оплата',
    cancellation = 'Отмена',
    all = 'Все'
}

export const enum BankNames {
    gazrpom = 'gazrpom',
    raifaisen = 'raifaisen',
    akbars = 'akbars',
    vtb = 'vtb',
    tinkoff = 'tinkoff',
    alfa = 'alfa',
    sber = 'sber',
    sbp = 'sbp'
}

export type statusCard =
    StatusCardPayments.frozen
    | StatusCardPayments.payment
    | StatusCardPayments.cancellation
    | StatusCardPayments.success
export type bankNames =
    BankNames.akbars
    | BankNames.sbp
    | BankNames.alfa
    | BankNames.vtb
    | BankNames.gazrpom
    | BankNames.raifaisen
    | BankNames.tinkoff
    | BankNames.sber


export type TrendRates = 'up' | 'down'

export interface ICommonData {
    balance: number;
    incomeToday: number;
    email: string;
    role: Role;
    wallet: string;
    walletQR: string;
    frozenBalance: string;
    onPaymentBalance: string;
    displayName: string;
}

export interface SearchByBankProps {
    handleBankFilter: (params: string) => void;
    handleFilterByCard?: (params: string) => void;
}

export interface SearchByInputProps {
    handleInputFilter: (params: string) => void;
}
