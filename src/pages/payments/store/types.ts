import {IMetaResponse, StatusCardPayments} from '../../../types';
import {Role} from '../../auth/store/auth.slice';

export interface IPayments {
    amount: number;
    bank: string;
    cardNumber: string;
    phoneNumber: string;
    updatedAt: string;
    id: number;
    profit: number
    status: string;
}

export interface ICommonDataPayments {
    payments: number
    turnover: string;
    income: string;
    onPayment: number;
    frozen: number;
}

export interface IPaymentsState {
    loading?: boolean;
    payments: IPayments[],
    isUseFilterPayment: boolean;
    turnover: Turnover;
    income: Income;
    meta: IMetaResponse;
    commonData: ICommonDataPayments
}

export interface IPaymentRequest {
    status: StatusCardPayments;
    role: Role;
}

export interface Turnover {
    'day': number;
    'total': number;
}

export interface Income {
    'day': number
    'total': number
}
