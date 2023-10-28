import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Select} from '../../../fields';
import {Calendar} from '../../../icons';
import {IOption} from '../../../types';
import {formatDate} from '../../../utils/formatDate';
import styles from './styles.module.scss';

const rangeList: IOption[] = [
    {label: 'За все время', value: 'all'},
    {label: 'За день', value: 'day'},
    {label: 'За неделю', value: 'week'},
    {label: 'За месяц', value: 'mouth'},
    {label: 'За год', value: 'year'},
];


const schema = yup.object({
    dateFrom: yup.string().required('Введите начало периода'),
    dateTo: yup.string().required('Введите конец периода'),
});

export interface SubmitValue {
    dateFrom : string;
    dateTo: string;
}

interface InputsFilterProps {
    submit?: ({dateTo, dateFrom}:SubmitValue) => void;
    submitTrader?: (interval: string) => void;
}
const date = new Date();

export const InputsFilter = ({submit, submitTrader}:InputsFilterProps) => {
    const currentDate = new Date();
    const {control, register, watch, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (item:IOption) => {
        if(submit) {
            if(item.value === 'all') {
                submit({dateTo: '', dateFrom: ''});
            } else {
                const dateTo = formatDate({date: currentDate});
                const dateFrom = formatDate({date: currentDate, period: item.value});
                submit({dateFrom, dateTo});
            }
        } else {
            submitTrader(item.value);
        }
    };

    return (
        <div className={styles.inputsFilter}>
            <div className={styles.inputsFilter__box}>
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
                    onChangeItem={onSubmit}
                    style={{border: '1px solid #667180', width: 'fit-content'}}
                />
            </div>
            <div className={styles.inputsFilter__box}>
                <p className={styles.inputsFilter__text}>{currentDate.toLocaleDateString('ru', {day: '2-digit', month: 'short', year: 'numeric'})}</p>
            </div>
        </div>
    );
};
