import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi} from '../../../api';
import {handleError} from '../../../store/app.slice';

export const getStatistic = createAsyncThunk(
    'statistic/getStatistic',
    async ({params = undefined}: { params?: string }, {dispatch, getState}) => {

            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.get(
                params
                    ? `/account/${auth.role}/stats?${params}`
                    : `/account/${auth.role}/stats`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

            return res.data;

    }
);
