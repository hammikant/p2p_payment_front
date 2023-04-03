import {createSlice} from '@reduxjs/toolkit';
import {IError, ISuccess} from '../types';

interface IAppState {
    error: IError | null;
    success: ISuccess | null
}

const initialState: IAppState = {
    error: null,
    success: null
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        handleError: (state, {payload}: { payload: IError | null }) => {
            state.error = payload;
        },
        handleSuccess: (state, {payload}: { payload: ISuccess | null }) => {
            state.success = payload;
        },
        clearStorage: () => {
        }
    }
});

export const {handleError, handleSuccess, clearStorage} = appSlice.actions;

export default appSlice.reducer;
