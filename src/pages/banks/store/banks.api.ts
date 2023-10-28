import {appApi} from '../../../store/app.api';
import {IMetaResponse} from '../../../types';
import {Role} from '../../auth/store/auth.slice';
import {IBank} from './types';

const banksApi = appApi.injectEndpoints({
    endpoints: build => ({
        getBanks: build.query<{banks: IBank[], meta: IMetaResponse}, {role: Role}>({
            query: ({role}) => ({
                url: `/finances/${role}/banks`,
                method: 'GET'
            }),
            transformResponse: ({data}) => {
                return data;
            }
        })
    }),
    overrideExisting: true
});

export const {useGetBanksQuery} = banksApi;
