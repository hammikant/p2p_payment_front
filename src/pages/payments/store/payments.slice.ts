import {createSlice} from '@reduxjs/toolkit';
import {IPayments} from './types';
import {getMorePayments, getPayments, searchByCardNumberPayments} from './payments.thunk';

const initialState: IPayments = {
    loading: false,
    commonData: {
        payments: 0,
        turnover: '0/0',
        income: '0/0',
        onPayment: 0,
        frozen: 0,
    },
    cards: [],
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
            state.cards = payload.cards;
            state.commonData = payload.commonData;
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
            state.cards = payload.cards;
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
            state.cards = [...state.cards, ...payload.cards];
            state.meta = payload.meta;
        });
        builder.addCase(getMorePayments.rejected, (state) => {
            state.loading = false;
        });
    }
});

export default paymentsSlice.reducer;
