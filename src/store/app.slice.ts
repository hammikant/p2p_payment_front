import {createSlice} from '@reduxjs/toolkit';
import {IError} from '../types';

interface IAppState {
    error: IError | null
}

const initialState: IAppState = {
    error: null
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        handleError: (state, {payload}: { payload: IError | null }) => {
            state.error = payload;
        },
    }
});

export const {handleError} = appSlice.actions;

export default appSlice.reducer;
