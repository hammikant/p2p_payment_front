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
        ],
        meta: {
            total: 0,
            nextPageUrl: '/get-history-actions?page=2',
            prevPageUrl: '/get-history-actions?page=1',
            isLastPage: false
        },
        historyActions: [
            {
                data: '20 мар. 2023, 15:48',
                action: 'Смена пароля',
                IPAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
                id: 1,
                userAgent: 'Chrome/111.0.0.0 (Mac)',
            }, {
                data: '20 мар. 2023, 15:48',
                action: 'Смена пароля',
                IPAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
                id: 2,
                userAgent: 'Chrome/111.0.0.0 (Mac)',
            }, {
                data: '20 мар. 2023, 15:48',
                action: 'Смена пароля',
                IPAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
                id: 3,
                userAgent: 'Chrome/111.0.0.0 (Mac)',
            }, {
                data: '20 мар. 2023, 15:48',
                action: 'Смена пароля',
                IPAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
                id: 4,
                userAgent: 'Chrome/111.0.0.0 (Mac)',
            }, {
                data: '20 мар. 2023, 15:48',
                action: 'Смена пароля',
                IPAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
                id: 5,
                userAgent: 'Chrome/111.0.0.0 (Mac)',
            },
        ]
    };
};
