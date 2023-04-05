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
    cancellation = 'Отмена'
}

export const enum BankNames {
    gazprom = 'gazprom',
    raiffeisen = 'raiffeisen',
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
    | BankNames.gazprom
    | BankNames.raiffeisen
    | BankNames.tinkoff
    | BankNames.sber


export type TrendRates = 'up' | 'down'

export interface IExchangeRates {
    buyingRate: number;
    currentRate: number;
    trend: TrendRates
}

export interface ICommonData {
    balance: number;
    balanceUs: number;
    incomeToday: number;
    incomeTodayUs: number;
    wallet: string;
    walletQRCode: string;
    exchangeRates: IExchangeRates;
}
