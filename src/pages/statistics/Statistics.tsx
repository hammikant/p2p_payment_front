import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {MainLayout} from '../../layouts';
import {SimpleCard} from '../../components/simpleCard';
import {ListCard} from '../../components/listCard';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {IOption} from '../../types';
import {Select} from '../../fields';
import {Calendar} from '../../icons';
import {getStatistic} from './store/statistic.thunk';
import {Chart} from './components';


const rangeList: IOption[] = [
    {label: 'За день', value: 'day'},
    {label: 'За неделю', value: 'week'},
    {label: 'За месяц', value: 'mouth'},
    {label: 'За год', value: 'year'},
];

const schema = yup.object({
    data: yup.string()
});

export const Statistics = () => {
    const dispatch = useAppDispatch();
    const {chart} = useAppSelector(state => state.statistic);

    const {control, register, handleSubmit, watch, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dispatch(getStatistic());
    }, []);

    return (
        <MainLayout titlePage={'Статистика'} descriptionPage={'Какое-то небольшое описание раздела'}>
            <Select
                label={''}
                control={control}
                register={register}
                fieldName={'data'}
                errors={errors}
                watch={watch}
                setValue={setValue}
                options={rangeList}
                customIcon={<Calendar/>}
                style={{border: '1px solid #667180', width: 'fit-content'}}
            />
            <div className={'space-top-24'}/>
            <div className={'row'}>
                <div className={'col'}>
                    <SimpleCard
                        name={'Доход'}
                        data={`${'common.income'} ₽`}
                        additionalData={`$${'common.incomeUs'}`}
                        style={{height: '160px'}}
                    />
                </div>
                <div className={'col'}>
                    <SimpleCard
                        name={'Оборот'}
                        data={`${'common.turnover'} ₽`}
                        additionalData={`$${'common.turnoverUs'}`}
                        style={{height: '160px'}}
                    />
                </div>
                <div className={'col'}>
                    <ListCard items={[]}/>
                </div>
            </div>
            <div className={'row'}>
                <Chart items={chart}/>
            </div>
        </MainLayout>
    );
};
