import {createSlice} from '@reduxjs/toolkit';
import {ICards} from './types';
import {getCards, getMoreCards} from './cards.thunk';

const initialState: ICards = {
    loading: false,
    cards: [],
    meta: {
        total: 0,
        nextPageUrl: null,
        prevPageUrl: null,
        isLastPage: false
    }
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        clearPayments: (state) => {
        }
    },
    extraReducers: builder => {
        builder.addCase(getCards.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCards.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.cards = payload.cards;
            state.meta = payload.meta;
        });
        builder.addCase(getCards.rejected, (state) => {
            state.loading = true;
        });
        builder.addCase(getMoreCards.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMoreCards.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.cards = [...state.cards, ...payload.cards];
            state.meta = payload.meta;
        });
        builder.addCase(getMoreCards.rejected, (state) => {
            state.loading = true;
        });
    }
});

export default cardsSlice.reducer;
