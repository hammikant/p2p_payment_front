import {createSlice} from '@reduxjs/toolkit';
import {signIn} from './auth.thunk';


interface IAuthState {
    isAuth: boolean;
    loading: boolean;
    token: string | null
}

const initialState: IAuthState = {
    isAuth: false,
    loading: false,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signIn.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.isAuth = true;
            state.token = payload;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.loading = false;
        });
    }
});


export default authSlice.reducer;
