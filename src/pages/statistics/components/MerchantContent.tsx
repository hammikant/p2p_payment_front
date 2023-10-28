import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/app';
import {Loader} from '../../../components/loader';
import {getStatistic} from '../store/statistic.thunk';
import {IOption} from '../../../types';
import {BubbleChartCard} from './BubbleChartCard';
import {VisiblePaymentsCard} from './VisiblePaymentsCard';
import styles from './styles.module.scss';
import {ProgressCard} from './ProgressCard';
import {InputsFilter, SubmitValue} from './InputsFilter';


export const MerchantContent = () => {
    const dispatch = useAppDispatch();
    const {stats} = useAppSelector(state => state.statistic);
    const [heightTable, setHeightTable] = useState<number>(0);
    const [currentBank, setCurrentBank] = useState<IOption | null>(null);
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');

    useEffect(() => {
        const rootHeight = document.getElementById('root').clientHeight;
        const containerHeight = document.getElementById('container').clientHeight;
        const height = rootHeight - containerHeight - 126 - 20;
        setHeightTable(height);
    }, []);

    useEffect(() => {
        if (currentBank !== null) {
            if(dateTo === '' && dateFrom === '') {
                dispatch(getStatistic({params: `bank=${currentBank.value}`}));
            } else {
                dispatch(getStatistic({params: `dateFrom=${dateFrom}&dateTo=${dateTo}&bank=${currentBank.value}`}));
            }
        } else {
            if(dateTo === '' && dateFrom === '') {
                dispatch(getStatistic({params: undefined}));
            } else {
                dispatch(getStatistic({params: `dateFrom=${dateFrom}&dateTo=${dateTo}`}));
            }
        }
    }, [currentBank, dateTo, dateFrom]);

    const handleFilterSubmit = ({dateFrom, dateTo}: SubmitValue) => {
        setDateFrom(dateFrom);
        setDateTo(dateTo);
    };

    if (!stats) {
        return <Loader />;
    }

    return (
        <div>
            <InputsFilter submit={handleFilterSubmit}/>
            <div className={styles.cards} style={{height: heightTable}}>
                <VisiblePaymentsCard handleSelectBank={item => {
                    item.value === 'all'
                        ? setCurrentBank(null)
                        : setCurrentBank(item);
                }}/>
                <BubbleChartCard banksDistribution={stats?.banksDistribution}/>
                <ProgressCard title={'Среднее время подтверждения платежей: 1 д. 12 ч. 25 м.'} items={stats.paymentsApprovalTimeDistribution}/>
                <ProgressCard title={'Среднее время подтверждения апелляций: 1 д. 12 ч. 25 м.'} items={stats.appealsProcessingTimeDistribution}/>
            </div>
        </div>
    );
};
