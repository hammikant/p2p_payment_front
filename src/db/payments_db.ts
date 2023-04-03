import {BankNames, StatusCard} from '../types';
import {IPayments} from '../pages/payments/store/types';


export const paymentsDb = (): IPayments => {
    return {
        balance: 17000.67,
        balanceUs: 345,
        incomeToday: 5679.67,
        incomeTodayUs: 98,
        commonData: {
            payments: 5678,
            turnover: '345/3455',
            income: '23/45',
            onPayment: 3453,
            frozen: 25,
        },
        cards: [
            {
                bankName: BankNames.akbars,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 1,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.success
            }, {
                bankName: BankNames.sbp,
                num: '+7 987 654 32 10',
                data: '20 мар. 2023, 15:48',
                id: 2,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.frozen
            }, {
                bankName: BankNames.alfa,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 3,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.success
            }, {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 4,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.cancellation
            }, {
                bankName: BankNames.gazprom,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 5,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.frozen
            }, {
                bankName: BankNames.raiffeisen,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 6,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.payment
            }, {
                bankName: BankNames.tinkoff,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 7,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.payment
            }, {
                bankName: BankNames.akbars,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 8,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.success
            }, {
                bankName: BankNames.sbp,
                num: '+7 987 654 32 10',
                data: '20 мар. 2023, 15:48',
                id: 9,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.frozen
            }, {
                bankName: BankNames.alfa,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 10,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.success
            }, {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 11,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.cancellation
            }, {
                bankName: BankNames.gazprom,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 12,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.frozen
            }, {
                bankName: BankNames.raiffeisen,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 13,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.payment
            }, {
                bankName: BankNames.tinkoff,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 14,
                profit: 7564435,
                sum: 8766534543,
                status: StatusCard.payment
            },
        ]
    };
};
