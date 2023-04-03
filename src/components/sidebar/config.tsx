import React, {ReactNode} from 'react';
import {ArrowLeftRight, Bank, Card, Deposit, Sim, Stat} from '../../icons';

interface IItem {
    path: string;
    name: string;
    icon: (isActive: boolean) => ReactNode;
}

export const config: IItem[] = [
    {
        path: '/',
        name: 'Платежи',
        icon: (isActive) => <ArrowLeftRight color={isActive ? '#0D1114' : '#667180'}/>
    }, {
        path: '/deposits',
        name: 'Депозиты',
        icon: (isActive) => <Deposit color={isActive ? '#0D1114' : '#667180'}/>
    }, {
        path: '/cards',
        name: 'Карты',
        icon: (isActive) => <Card color={isActive ? '#0D1114' : '#667180'}/>
    }, {
        path: '/banks',
        name: 'Банки',
        icon: (isActive) => <Bank color={isActive ? '#0D1114' : '#667180'}/>
    }, {
        path: '/sim-banks',
        name: 'SIM-Банки',
        icon: (isActive) => <Sim color={isActive ? '#0D1114' : '#667180'}/>
    }, {
        path: '/stats',
        name: 'Статистика',
        icon: (isActive) => <Stat color={isActive ? '#0D1114' : '#667180'}/>
    },
];
