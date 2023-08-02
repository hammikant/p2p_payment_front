import {createSlice} from '@reduxjs/toolkit';
import {getMorePayments, getPayments, searchByCardNumberPayments} from './payments.thunk';
import {IPaymentsState} from './types';

const initialState: IPaymentsState = {
    loading: false,
    commonData: {
        payments: 0,
        turnover: '0/0',
        income: '0/0',
        onPayment: 0,
        frozen: 0,
    },
    payments: [],
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
            state.meta = payload.meta;
        });
        builder.addCase(getPayments.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(searchByCardNumberPayments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchByCardNumberPayments.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.payments = payload.payments;
        });
        builder.addCase(searchByCardNumberPayments.rejected, (state) => {
            state.loading = false;
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
