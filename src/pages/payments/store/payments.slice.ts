import {createSlice} from '@reduxjs/toolkit';
import {IPayments} from './types';
import {getPayments} from './payments.thunk';

const initialState: IPayments = {
    balance: 0,
    balanceUs: 0,
    incomeToday: 0,
    incomeTodayUs: 0,
    commonData: {
        payments: 0,
        turnover: '0/0',
        income: '0/0',
        onPayment: 0,
        frozen: 0,
    },
    cards: []
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
        });
        builder.addCase(getPayments.fulfilled, (state, {payload}) => {
            state.balance = payload.balance;
            state.balanceUs = payload.balanceUs;
            state.incomeToday = payload.incomeToday;
            state.incomeTodayUs = payload.incomeTodayUs;
            state.commonData = payload.commonData;
            state.cards = payload.cards;
        });
        builder.addCase(getPayments.rejected, (state) => {
        });
    }
});

export default paymentsSlice.reducer;
