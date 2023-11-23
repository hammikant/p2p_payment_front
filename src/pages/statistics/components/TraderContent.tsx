import React, {useEffect, useState} from 'react';
import {SimpleCard} from '../../../components/simpleCard';
import {useAppDispatch, useAppSelector} from '../../../hooks/app';
import {getStatistic} from '../store/statistic.thunk';
import {Chart} from './Chart';
import {InputsFilter} from './InputsFilter';

const localConfig:any = {
    day: 'numeric', month: 'short', year: 'numeric'
};

export const TraderContent = () => {
    const dispatch = useAppDispatch();
    const {exchangeRates} = useAppSelector(state => state.app);
    const {stats} = useAppSelector(state => state.statistic);

    const [interval, setTimeInterval] = useState<string>('all');
    useEffect(() => {
        if(interval === 'all') {
            dispatch(getStatistic({params: undefined}));
        } else {
            dispatch(getStatistic({params: `interval=${interval}`}));
        }
    }, [interval]);


    const handleFilterSubmit = (interval: string) => {
        setTimeInterval(interval);
    };

    return (
        <>
            <div id={'container'}>
                <InputsFilter
                    dataRangeStr={
                    `${new Date(stats?.data[0].date).toLocaleDateString('ru', localConfig)} - ${new Date(stats?.data.at(-1).date).toLocaleDateString('ru',localConfig)}`}
                    submitTrader={handleFilterSubmit} />
                <div className={'space-top-24'}/>
                <div className={'row'}>
                    <div className={'col'}>
                        <SimpleCard
                            name={'Доход'}
                            data={`${stats?.income} ₽`}
                            additionalData={`$${(stats?.income / exchangeRates.usdtrub).toFixed(2)}`}
                            style={{height: '160px'}}
                        />
                    </div>
                    <div className={'col'}>
                        <SimpleCard
                            name={'Оборот'}
                            data={`${stats?.turnover} ₽`}
                            additionalData={`$${(stats?.turnover / exchangeRates.usdtrub).toFixed(2)}`}
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
