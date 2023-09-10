import {createSlice} from '@reduxjs/toolkit';
import {cardsFilter, changeStatusCard, getCards, getCardsById, getMoreCards} from './cards.thunk';
import {ICardsState} from './types';

const initialState: ICardsState = {
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
        builder.addCase(cardsFilter.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cardsFilter.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.cards = payload.cards;
        });
        builder.addCase(cardsFilter.rejected, (state) => {
            state.loading = true;
        });
        builder.addCase(getCardsById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCardsById.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.cards = payload.cards;
        });
        builder.addCase(getCardsById.rejected, (state) => {
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
        builder.addCase(changeStatusCard.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeStatusCard.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.cards = state.cards.map(c => {
                if (Number(c.id) === Number(payload.id)) {
                    return {...c, ...payload};
                }
                return c;
            });
        });
        builder.addCase(changeStatusCard.rejected, (state) => {
            state.loading = true;
        });

    }
});

export default cardsSlice.reducer;
