import {ISimBank, ISimBankStore} from '../pages/simBanks/store/types';

export const simpleSimBank: ISimBank = {
    id: 10,
    name: 'Сим банк 1',
    create_as: '20 мар. 2023',
    redirectMail: 'test@mail.ru',
    confirmationCode: 'v7D5zFmJ',
    cellPhones: [
        {
            id: 1, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 2, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 3, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 4, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 5, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 6, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 7, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 8, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 9, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 10, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 11, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 12, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 13, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 14, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 15, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 16, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 17, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 18, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 19, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 20, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 21, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 22, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 23, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 24, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 25, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 26, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 27, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 28, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 29, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 30, cellPhone: '+7 987 654 32 10', status: 'inactive'
        }, {
            id: 31, cellPhone: '+7 987 654 32 10', status: 'active'
        }, {
            id: 32, cellPhone: '+7 987 654 32 10', status: 'active'
        },
    ]
};

export const simBanksDb = (): ISimBankStore => {
    return {
        meta: {
            total: 100,
            nextPageUrl: '/get-sim-bank?page=2',
            prevPageUrl: '/get-sim-bank?page=1',
            isLastPage: false
        },
        list: [
            {
                id: 1,
                name: 'Сим банк 1',
                create_as: '20 мар. 2023',
                redirectMail: 'test@mail.ru',
                confirmationCode: 'v7D5zFmJ',
                cellPhones: [
                    {
                        id: 1, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 2, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 3, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 4, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 5, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 6, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 7, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 8, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 9, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 10, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 11, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 12, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 13, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 14, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 15, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 16, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 17, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 18, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 19, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 20, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 21, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 22, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 23, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 24, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 25, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 26, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 27, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 28, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 29, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 30, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 31, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 32, cellPhone: '+7 987 654 32 10', status: 'active'
                    },
                ]
            }, {
                id: 2,
                name: 'Сим банк 2',
                create_as: '20 мар. 2023',
                redirectMail: 'test@mail.ru',
                confirmationCode: 'v7D5zFmJ',
                cellPhones: [
                    {
                        id: 1, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 2, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 3, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 4, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 5, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 6, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 7, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 8, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 9, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 10, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 11, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 12, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 13, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 14, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 15, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 16, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 17, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 18, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 19, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 20, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 21, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 22, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 23, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 24, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 25, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 26, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 27, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 28, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 29, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 30, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 31, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 32, cellPhone: '+7 987 654 32 10', status: 'active'
                    },
                ]
            }, {
                id: 3,
                name: 'Сим банк 3',
                create_as: '20 мар. 2023',
                redirectMail: 'test@mail.ru',
                confirmationCode: 'v7D5zFmJ',
                cellPhones: [
                    {
                        id: 1, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 2, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 3, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 4, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 5, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 6, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 7, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 8, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 9, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 10, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 11, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 12, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 13, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 14, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 15, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 16, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 17, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 18, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 19, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 20, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 21, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 22, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 23, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 24, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 25, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 26, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 27, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 28, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 29, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 30, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 31, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 32, cellPhone: '+7 987 654 32 10', status: 'active'
                    },
                ]
            }, {
                id: 4,
                name: 'Сим банк 4',
                create_as: '20 мар. 2023',
                redirectMail: 'test@mail.ru',
                confirmationCode: 'v7D5zFmJ',
                cellPhones: [
                    {
                        id: 1, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 2, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 3, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 4, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 5, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 6, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 7, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 8, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 9, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 10, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 11, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 12, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 13, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 14, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 15, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 16, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 17, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 18, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 19, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 20, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 21, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 22, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 23, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 24, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 25, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 26, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 27, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 28, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 29, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 30, cellPhone: '+7 987 654 32 10', status: 'inactive'
                    }, {
                        id: 31, cellPhone: '+7 987 654 32 10', status: 'active'
                    }, {
                        id: 32, cellPhone: '+7 987 654 32 10', status: 'active'
                    },
                ]
            },
        ]
    };
};
