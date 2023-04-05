import {createSlice} from '@reduxjs/toolkit';
import {IBanks} from './types';
import {addBank, getBanks} from './banks.thunk';

const initialState: IBanks = {
    loading: false,
    list: [],
    meta: {
        isLastPage: false,
        total: 0,
        prevPageUrl: null,
        nextPageUrl: null
    }
};

const banksSlice = createSlice({
    name: 'banks',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addBank.pending, state => {
            state.loading = true;
        });
        builder.addCase(addBank.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list.push(payload);
        });
        builder.addCase(addBank.rejected, state => {
            state.loading = false;
        });
        builder.addCase(getBanks.pending, state => {
            state.loading = true;
        });
        builder.addCase(getBanks.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = payload.banks;
            state.meta = payload.meta;
        });
        builder.addCase(getBanks.rejected, state => {
            state.loading = false;
        });
    }
});

export default banksSlice.reducer;
