import {ICards} from '../pages/cards/store/types';

export const cardsDb = (): ICards => {
    return {
        meta: {
            total: 10,
            nextPageUrl: '/get-cards?page=2',
            prevPageUrl: '/get-cards?page=1',
            isLastPage: false
        },
        cards: []
    };
};
