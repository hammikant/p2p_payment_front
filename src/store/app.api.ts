import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import {handleSuccess} from './app.slice';

export const BASE_URL: string = 'https://p2p.twc1.net/v1';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    //credentials: 'include',
    mode: 'cors',
    prepareHeaders: (headers, {getState}) => {
        const {auth} = getState() as any;
        if (auth) {
            headers.set('authorization', `Bearer ${auth.token}`);
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log('args', args);
    console.log('error', result.error);
    if (result.error && result.error.status === 401) {
        const state = api.getState() as any;
        const {settings} = state;

        const refreshResult = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refreshToken: settings.refresh_token,
        });

        if (refreshResult.data) {
            // store the new token добавляем токен в store
            //api.dispatch(updateToken(refreshResult.data.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Здесь если что logout
            //api.dispatch(setLogout());
        }
    }

    if (result.error && result.error.data) {
        const {data} = result.error.data as any;
        if (data?.errors) {
            api.dispatch(handleSuccess({message: JSON.stringify(data.errors)}));
        }
        if (typeof data === 'string') {
            api.dispatch(handleSuccess({message: data}));
        }
    }

    if (result.error && result.error?.status >= 500) {
        api.dispatch(handleSuccess({message: result.error.status.toString()}));
    }

    return result;
};

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: baseQueryWithReauth,
    refetchOnFocus: true,
    tagTypes: [],
    endpoints: builder => ({
    }),
});

export const { } = appApi;
