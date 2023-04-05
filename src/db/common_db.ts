import qrCodeSource from '../assets/images/qr-code.png';

export const commonDb = () => {
    return {
        balance: 17000.67,
        balanceUs: 345,
        incomeToday: 5679.67,
        incomeTodayUs: 98,
        wallet: 'TDhNZhzYBDNmUuiVPu8VjdiBMxEuiQuumc',
        walletQRCode: qrCodeSource,
        exchangeRates: {
            buyingRate: 78.02,
            currentRate: 80.56,
            trend: 'up'
        },
        bankNames: [
            {label: 'Газпром', value: 'gazprom'},
            {label: 'Райфайзен', value: 'raiffeisen'},
            {label: 'Акбарс', value: 'akbars'},
            {label: 'ВТБ', value: 'vtb'},
            {label: 'Tinkoff', value: 'tinkoff'},
            {label: 'Альфа', value: 'alfa'},
            {label: 'Сбербанк', value: 'sber'},
        ],
        simBanksCellPhones: [
            {label: '+7 987 654 32 10', value: '+7 987 654 32 10'},
            {label: '+7 987 654 32 10', value: '+7 987 654 32 10'},
            {label: '+7 987 654 32 10', value: '+7 987 654 32 10'},
            {label: '+7 987 654 32 10', value: '+7 987 654 32 10'},
        ]
    };
};
