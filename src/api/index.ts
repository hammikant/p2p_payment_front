import axios from 'axios';
import {setAppLoader} from '../pages/auth/store/auth.slice';
import {clearStorage} from '../store/app.slice';
import {store} from '../store';

export const instanceApi = axios.create({
    baseURL: 'https://api.despay.io/v1'
});
