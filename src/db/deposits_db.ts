import {IDeposits} from '../pages/deposits/store/types';

export const depositsDb = (): IDeposits => {
    return {
        meta: {
            nextPageUrl: '/get-deposits?page=2',
            prevPageUrl: '/get-deposits?page=2',
            isLastPage: false,
            total: 100
        },
        list: []
    };
};
