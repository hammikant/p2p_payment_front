import axios from 'axios';
import {setAppLoader} from '../pages/auth/store/auth.slice';
import {clearStorage} from '../store/app.slice';
import {store} from '../store';

export const instanceApi = axios.create({
    baseURL: 'https://p2p.twc1.net/v1' //'https://api.despay.io/v1'
});
