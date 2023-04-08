import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi, mockInstanceApi} from '../../../api';
import {handleError} from '../../../store/app.slice';
import {statisticDb} from '../../../db/statistic_db';

export const getStatistic = createAsyncThunk(
    'statistic/getStatistic',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet('/get-statistic')
                .reply(200,
                    statisticDb(), {
                        Authorization: `Bearer ${auth.token}`
                    });
            const res = await instanceApi.get('/get-statistic', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);
