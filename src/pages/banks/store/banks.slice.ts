import {createSlice} from '@reduxjs/toolkit';
import {IBanks} from './types';
import {
    addBank,
    authorizationBank,
    banksFilter,
    connectCardsInBank,
    deleteBank,
    getBanks,
    getMoreBanks,
    updateBank
} from './banks.thunk';

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
            state.list = [payload, ...state.list];
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
        builder.addCase(banksFilter.pending, state => {
            state.loading = true;
        });
        builder.addCase(banksFilter.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = payload.banks;
            state.meta = payload.meta;
        });
        builder.addCase(banksFilter.rejected, state => {
            state.loading = false;
        });
        builder.addCase(getMoreBanks.fulfilled, (state, {payload}) => {
            state.list = [...state.list, ...payload.banks];
            state.meta = payload.meta;
        });
        builder.addCase(authorizationBank.pending, state => {
            state.loading = true;
        });
        builder.addCase(authorizationBank.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = state.list.map(item => {
                if (item.id === payload.id) {
                    return {...item, ...payload};
                }
                return item;
            });
        });
        builder.addCase(authorizationBank.rejected, state => {
            state.loading = false;
        });
        builder.addCase(updateBank.pending, state => {
            state.loading = true;
        });
        builder.addCase(updateBank.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = state.list.map(item => {
                if (item.id === payload.id) {
                    return {...item, ...payload};
                }
                return item;
            });
        });
        builder.addCase(updateBank.rejected, state => {
            state.loading = false;
        });
        builder.addCase(deleteBank.pending, state => {
            state.loading = true;
        });
        builder.addCase(deleteBank.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = state.list.filter(item => item.id !== payload);
        });
        builder.addCase(deleteBank.rejected, state => {
            state.loading = false;
        });
        builder.addCase(connectCardsInBank.fulfilled, (state, {payload}) => {

            state.list = state.list.map(item => {
                if (item.id === payload.id) {
                    return {...item, ...payload};
                }
                return item;
            });
        });
    }
});

export default banksSlice.reducer;
