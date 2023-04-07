import React from 'react';
import {MainLayout} from '../../layouts';
import {SimpleCard} from '../../components/simpleCard';
import {ListCard} from '../../components/listCard';

export const Statistics = () => {
    return (
        <MainLayout titlePage={'Статистика'} descriptionPage={'Какое-то небольшое описание раздела'}>
            <div className={'row'}>
                <div className={'col'}>
                    <SimpleCard name={'Доход'} data={'9 748,29 ₽'} additionalData={'$126,14'}/>
                </div>
                <div className={'col'}>
                    <SimpleCard name={'Доход'} data={'9 748,29 ₽'} additionalData={'$126,14'}/>
                </div>
                <div className={'col'}>
                    <ListCard items={[]}/>
                </div>
            </div>
        </MainLayout>
    );
};
