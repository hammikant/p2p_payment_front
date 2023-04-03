import {createSlice} from '@reduxjs/toolkit';
import {ICards} from './types';
import {getCards} from './cards.thunk';

const initialState: ICards = {
    cards: []
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
        });
        builder.addCase(getCards.fulfilled, (state, {payload}) => {
            state.cards = payload.cards;
        });
        builder.addCase(getCards.rejected, (state) => {
        });
    }
});

export default cardsSlice.reducer;
