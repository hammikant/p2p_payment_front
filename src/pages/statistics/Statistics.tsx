import React, {useEffect} from 'react';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {MerchantContent, TraderContent} from './components';
import {getStatistic} from './store/statistic.thunk';

export const Statistics = () => {
    const dispatch = useAppDispatch();
    const {role} = useAppSelector(state => state.auth);
    // useEffect(() => {
    //     dispatch(getStatistic({params: undefined}));
    // }, []);
    return (
        <MainLayout titlePage={'Статистика'} descriptionPage={'Какое-то небольшое описание раздела'}>
            <div id={'container'}>
                {role === 'merchant' ? <MerchantContent/> : <TraderContent/>}
            </div>
        </MainLayout>
    );
};
