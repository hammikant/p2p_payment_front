export const banksDb = () => {
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
                bankName: 'vtb',
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023'
            },
            {
                id: 2,
                name: 'Название макс 25 символов',
                bankName: 'vtb',
                cards: '100шт',
                verification: true,
                spb: false,
                acceptingPayments: false,
                create_as: '20 мар. 2023'
            },
            {
                id: 3,
                name: 'Название макс 25 символов',
                bankName: 'vtb',
                cards: '50шт',
                verification: true,
                spb: true,
                acceptingPayments: true,
                create_as: '20 мар. 2023'
            },
            {
                id: 4,
                name: 'Название макс 25 символов',
                bankName: 'raiffeisen',
                cards: null,
                verification: false,
                spb: false,
                acceptingPayments: true,
                create_as: '20 мар. 2023'
            },
            {
                id: 5,
                name: 'Название макс 25 символов',
                bankName: 'akbars',
                cards: null,
                verification: false,
                spb: false,
                acceptingPayments: false,
                create_as: '20 мар. 2023'
            },
            {
                id: 6,
                name: 'Название макс 25 символов',
                bankName: 'alfa',
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023'
            },
            {
                id: 7,
                name: 'Название макс 25 символов',
                bankName: 'sber',
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023'
            },
            {
                id: 8,
                name: 'Название макс 25 символов',
                bankName: 'vtb',
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023'
            },
            {
                id: 9,
                name: 'Название макс 25 символов',
                bankName: 'vtb',
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023'
            },
            {
                id: 10,
                name: 'Название макс 25 символов',
                bankName: 'vtb',
                cards: '80шт',
                verification: true,
                spb: true,
                acceptingPayments: false,
                create_as: '20 мар. 2023'
            },

        ]
    };
};
