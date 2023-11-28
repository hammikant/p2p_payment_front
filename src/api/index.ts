import axios from 'axios';

export const instanceApi = axios.create({
    baseURL: /*'https://p2p.twc1.net/v1'*/  'https://api.despay.io/v1'
});
