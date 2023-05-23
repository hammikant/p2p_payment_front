import {IMetaResponse} from '../types';
import {IBank} from '../pages/banks/store/types';

export const banksDb = (): { meta: IMetaResponse, banks: IBank[] } => {
    return {
        meta: {
            total: 10,
            nextPageUrl: '/get-cards?page=2',
            prevPageUrl: '/get-cards?page=1',
            isLastPage: false
        },
        banks: []
    };
};
