import {BankNames, IMetaResponse} from '../types';
import {IBank} from '../pages/banks/store/types';

export const banksDb = (): { meta: IMetaResponse, banks: IBank[] } => {
    return {
        meta: {
            total: 10,
            nextPageUrl: '/get-cards?page=2',
            prevPageUrl: '/get-cards?page=1',
            isLastPage: false
        },
        banks: [
            {
                id: 1,
                name: 'Название макс 25 символов',
                bankName: BankNames.vtb,
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023',
                verificationData: null,
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 2,
                name: 'Название макс 25 символов',
                bankName: BankNames.vtb,
                cards: '100шт',
                verification: true,
                spb: false,
                acceptingPayments: false,
                create_as: '20 мар. 2023',
                verificationData: null,
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 3,
                name: 'Название макс 25 символов',
                bankName: BankNames.raiffeisen,
                cards: '50шт',
                verification: true,
                spb: true,
                acceptingPayments: true,
                create_as: '20 мар. 2023',
                verificationData: null,
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 4,
                name: 'Название макс 25 символов',
                bankName: BankNames.tinkoff,
                cards: null,
                verification: false,
                spb: false,
                acceptingPayments: true,
                create_as: '20 мар. 2023',
                verificationData: {cellPhone: '+7 987 654 32 10', comment: '6549'},
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 5,
                name: 'Название макс 25 символов',
                bankName: BankNames.akbars,
                cards: null,
                verification: false,
                spb: false,
                acceptingPayments: false,
                create_as: '20 мар. 2023',
                verificationData: {cellPhone: '+7 987 654 32 10', comment: '6549'},
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 6,
                name: 'Название макс 25 символов',
                bankName: BankNames.alfa,
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023',
                verificationData: null,
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 7,
                name: 'Название макс 25 символов',
                bankName: BankNames.sber,
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023',
                verificationData: null,
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 8,
                name: 'Название макс 25 символов',
                bankName: BankNames.vtb,
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023',
                verificationData: null,
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 9,
                name: 'Название макс 25 символов',
                bankName: BankNames.vtb,
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023',
                verificationData: null,
                simBankCellPhone: '+7 987 654 32 10'
            },
            {
                id: 10,
                name: 'Название макс 25 символов',
                bankName: BankNames.sbp,
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023',
                verificationData: null,
                simBankCellPhone: '+7 987 654 32 10'
            },

        ]
    };
};
