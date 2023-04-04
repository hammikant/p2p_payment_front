import {BankNames} from '../types';
import {ICards} from '../pages/cards/store/types';

export const cardsDb = (): ICards => {
    return {
        meta: {
            total: 10,
            nextPageUrl: '/get-cards?page=2',
            prevPageUrl: '/get-cards?page=1',
            isLastPage: false
        },
        cards: [
            {
                bankName: BankNames.sber,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 1,
                bank: 'Не подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 2,
                bank: 'Не подключён',
                status: 'Не активна'
            },
            {
                bankName: BankNames.sbp,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 3,
                bank: 'Не подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.gazprom,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 4,
                bank: 'Подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 5,
                bank: 'Не подключён',
                status: 'Не активна'
            },
            {
                bankName: BankNames.tinkoff,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 6,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.raiffeisen,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 7,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.sbp,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 8,
                bank: 'Не подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.gazprom,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 9,
                bank: 'Подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 10,
                bank: 'Не подключён',
                status: 'Не активна'
            },
            {
                bankName: BankNames.tinkoff,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 11,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.raiffeisen,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 12,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.sbp,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 13,
                bank: 'Не подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.gazprom,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 14,
                bank: 'Подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 15,
                bank: 'Не подключён',
                status: 'Не активна'
            },
            {
                bankName: BankNames.tinkoff,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 16,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.raiffeisen,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 17,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.sbp,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 18,
                bank: 'Не подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.gazprom,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 19,
                bank: 'Подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 20,
                bank: 'Не подключён',
                status: 'Не активна'
            },
            {
                bankName: BankNames.tinkoff,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 21,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.raiffeisen,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 22,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.sbp,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 23,
                bank: 'Не подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.gazprom,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 24,
                bank: 'Подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 25,
                bank: 'Не подключён',
                status: 'Не активна'
            },
            {
                bankName: BankNames.tinkoff,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 26,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.raiffeisen,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 27,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.sbp,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 28,
                bank: 'Не подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.gazprom,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 29,
                bank: 'Подключён',
                status: 'На паузе'
            },
            {
                bankName: BankNames.vtb,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 30,
                bank: 'Не подключён',
                status: 'Не активна'
            },
            {
                bankName: BankNames.tinkoff,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 31,
                bank: 'Подключён',
                status: 'Активна'
            },
            {
                bankName: BankNames.raiffeisen,
                num: '4001 9192 5753 7193',
                data: '20 мар. 2023, 15:48',
                id: 32,
                bank: 'Подключён',
                status: 'Активна'
            },

        ]
    };
};
