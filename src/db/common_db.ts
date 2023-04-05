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
        commonData: {
            payments: 5678,
            turnover: '345/3455',
            income: '23/45',
            onPayment: 3453,
            frozen: 25,
        },
    };
};
