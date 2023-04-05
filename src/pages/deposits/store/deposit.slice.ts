import {createSlice} from '@reduxjs/toolkit';
import {IDeposits} from './types';
import {getDeposits, getMoreDeposits} from './deposit.thunk';

const initialState: IDeposits = {
    loading: false,
    meta: {
        nextPageUrl: null,
        prevPageUrl: null,
        total: 0,
        isLastPage: false
    },
    list: []
};

const depositSlice = createSlice({
    name: 'deposits',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getDeposits.pending, state => {
            state.loading = true;
        });
        builder.addCase(getDeposits.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = payload.list;
            state.meta = payload.meta;
        });
        builder.addCase(getDeposits.rejected, state => {
            state.loading = false;
        });
        builder.addCase(getMoreDeposits.pending, state => {
            state.loading = true;
        });
        builder.addCase(getMoreDeposits.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = [...state.list, ...payload.list];
            state.meta = payload.meta;
        });
        builder.addCase(getMoreDeposits.rejected, state => {
            state.loading = false;
        });

    }
});

export default depositSlice.reducer;
