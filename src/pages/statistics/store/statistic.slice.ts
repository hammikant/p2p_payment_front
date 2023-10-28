import {createSlice} from '@reduxjs/toolkit';
import {IStatistic} from './types';
import {getStatistic} from './statistic.thunk';

interface IStatisticState extends IStatistic {
    loading: boolean;
}

const initialState: IStatisticState = {
    loading: false,
    chart: [],
    stats: null
};

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStatistic.pending, state => {
            state.loading = true;
        });
        builder.addCase(getStatistic.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.stats = payload;
        });
        builder.addCase(getStatistic.rejected, state => {
            state.loading = false;
        });
    }
});

export default statisticSlice.reducer;
