import {BankNames} from '../types';
import {ICards} from '../pages/cards/store/types';

export const cardsDb = (): ICards => {
    return {
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

        ]
    };
};
