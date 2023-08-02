import axios from 'axios';
import {store} from '../store';
import {handleError} from '../store/app.slice';

const instanceApi = axios.create({
    baseURL: 'https://p2p.twc1.net/v1'
});

// Добавляем перехват запросов
instanceApi.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Сделайте что-нибудь с ошибкой запроса
    return Promise.reject(error);
});
// Добавляем перехват ответов
export {instanceApi};
