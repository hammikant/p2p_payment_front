import axios from 'axios';

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

export {instanceApi};
