import {createSlice} from '@reduxjs/toolkit';
import {ICellPhoneSimBank, ISimBankStore} from './types';
import {addSimBank, connectCellPhonesInSimBank, deleteCellPhones, deleteSimBank, getSimBanks} from './simBanks.thunk';

interface IStore extends ISimBankStore {
    connectingCellPhones: ICellPhoneSimBank[]
}

const initialState: IStore = {
    loading: false,
    list: [],
    connectingCellPhones: [],
    meta: {
        total: 0,
        nextPageUrl: null,
        prevPageUrl: null,
        isLastPage: true
    }
};

const simBanksSlice = createSlice({
    name: 'simBank',
    initialState,
    reducers: {
        clearConnectingCellPhones: (state) => {
            state.connectingCellPhones = [];
        },
        setConnectingCellPhones: (state, {payload}) => {
            state.connectingCellPhones = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getSimBanks.pending, state => {
            state.loading = true;
        });
        builder.addCase(getSimBanks.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = payload.list;
            state.meta = payload.meta;
        });
        builder.addCase(getSimBanks.rejected, state => {
            state.loading = false;
        });
        builder.addCase(addSimBank.pending, state => {
            state.loading = true;
        });
        builder.addCase(addSimBank.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = [payload, ...state.list];
            state.meta = payload.meta;
        });
        builder.addCase(addSimBank.rejected, state => {
            state.loading = false;
        });

        builder.addCase(deleteSimBank.pending, state => {
            state.loading = true;
        });
        builder.addCase(deleteSimBank.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = state.list.filter(item => item.id !== payload);
        });
        builder.addCase(deleteSimBank.rejected, state => {
            state.loading = false;
        });
        builder.addCase(connectCellPhonesInSimBank.pending, state => {
            state.loading = true;
        });
        builder.addCase(connectCellPhonesInSimBank.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.list = state.list.map(item => {
                if (item.id === payload.id) {
                    return {...item, cellPhones: payload.cellPhones};
                }
                return item;
            });
        });
        builder.addCase(connectCellPhonesInSimBank.rejected, state => {
            state.loading = false;
        });
        builder.addCase(deleteCellPhones.pending, state => {
            state.loading = true;
        });
        builder.addCase(deleteCellPhones.fulfilled, (state, {payload}) => {
            const delIds = payload.cellPhones.map((i: ICellPhoneSimBank) => i.id);
            state.loading = false;
            state.list = state.list.map(item => {
                if (item.id === payload.id) {
                    return {...item, cellPhones: item.cellPhones.filter(i => !delIds.includes(i.id))};
                }
                return item;
            });
        });
        builder.addCase(deleteCellPhones.rejected, state => {
            state.loading = false;
        });

    }
});

export const {clearConnectingCellPhones, setConnectingCellPhones} = simBanksSlice.actions;

export default simBanksSlice.reducer;
