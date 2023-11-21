import React, {useEffect, useState} from 'react';
import {SimpleCard} from '../../../components/simpleCard';
import {useAppDispatch, useAppSelector} from '../../../hooks/app';
import {getStatistic} from '../store/statistic.thunk';
import {Loader} from '../../../components/loader';
import {TraderStats} from '../store/types';
import {Chart} from './Chart';
import {InputsFilter, SubmitValue} from './InputsFilter';
import styles from './styles.module.scss';

export const TraderContent = () => {
    const dispatch = useAppDispatch();
    const {exchangeRates} = useAppSelector(state => state.app);
    const {stats, loading} = useAppSelector(state => state.statistic);

    // const [dateFrom, setDateFrom] = useState<string>('');
    // const [dateTo, setDateTo] = useState<string>('');

    const [interval, setTimeInterval] = useState<string>('all');
    useEffect(() => {
        // if(dateTo === '' && dateFrom === '') {
        //     dispatch(getStatistic({params: undefined}));
        // } else {
        //     dispatch(getStatistic({params: `dateFrom=${dateFrom}&dateTo=${dateTo}`}));
        // }
        if(interval === 'all') {
            dispatch(getStatistic({params: undefined}));
        } else {
            dispatch(getStatistic({params: `interval=${interval}`}));
        }
    }, [ /*dateTo, dateFrom*/, interval]);


    const handleFilterSubmit = (interval: string) => {
        setTimeInterval(interval);
        // setDateFrom(dateFrom);
        // setDateTo(dateTo);
    };

    if(loading) {
        return <Loader />;
    }

    return (
        <>
            <div id={'container'}>
                <InputsFilter submitTrader={handleFilterSubmit} />
                <div className={'space-top-24'}/>
                <div className={'row'}>
                    <div className={'col'}>
                        <SimpleCard
                            name={'Доход'}
                            data={`${stats?.income} ₽`}
                            additionalData={`$${stats?.income / exchangeRates.usdtrub}`}
                            style={{height: '160px'}}
                        />
                    </div>
                    <div className={'col'}>
                        <SimpleCard
                            name={'Оборот'}
                            data={`${stats?.turnover} ₽`}
                            additionalData={`$${stats?.turnover / exchangeRates.usdtrub}`}
                            style={{height: '160px'}}
                        />
                    </div>
                </div>
            </div>
            <div className={'row'}>
                <Chart items={stats?.data}/>
            </div>
        </>
    );
};
