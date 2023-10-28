import {createSlice} from '@reduxjs/toolkit';
import {getMorePayments, getPayments, paymentsFilter} from './payments.thunk';
import {IPaymentsState} from './types';

const initialState: IPaymentsState = {
    loading: false,
    isUseFilterPayment: false,
    commonData: {
        payments: 0,
        turnover: '0/0',
        income: '0/0',
        onPayment: 0,
        frozen: 0,
    },
    payments: [],
    income: {
        day: 0, total: 0
    },
    turnover: {
        day: 0, total: 0
    },
    meta: {
        total: 0,
        nextPageUrl: null,
        prevPageUrl: null,
        isLastPage: true
    }
};

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        clearPayments: (state) => {
        }
    },
    extraReducers: builder => {
        builder.addCase(getPayments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPayments.fulfilled, (state, {payload}) => {
            state.payments = payload.payments;
            state.income = payload.income;
            state.turnover = payload.turnover;
            state.meta = payload.meta;
            state.isUseFilterPayment = false;
        });
        builder.addCase(getPayments.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(paymentsFilter.pending, (state) => {
            state.loading = true;
            state.isUseFilterPayment = true;
        });
        builder.addCase(paymentsFilter.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.payments = payload.payments;
            state.meta = payload.meta;
        });
        builder.addCase(paymentsFilter.rejected, (state) => {
            state.loading = false;
            state.isUseFilterPayment = false;
        });

        builder.addCase(getMorePayments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMorePayments.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.commonData = payload.commonData;
            state.payments = [...state.payments, ...payload.payments];
            state.meta = payload.meta;
        });
        builder.addCase(getMorePayments.rejected, (state) => {
            state.loading = false;
        });
    }
});

export default paymentsSlice.reducer;
