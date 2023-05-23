import {createSlice} from '@reduxjs/toolkit';
import {IStatistic} from './types';
import {getStatistic} from './statistic.thunk';

interface IStatisticState extends IStatistic {
    loading: boolean;
}

const initialState: IStatisticState = {
    loading: false,
    common: {
        income: 0,
        incomeUs: 0,
        turnover: 0,
        turnoverUs: 0,
        statisticDataList: {
            banks: '',
            sbp: '',
            cards: '',
            payments: ''
        }
    },
    chart: []
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
            state.common = payload.common;
            state.chart = payload.chart;
        });
        builder.addCase(getStatistic.rejected, state => {
            state.loading = false;
        });
    }
});

export default statisticSlice.reducer;
