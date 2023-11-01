import React from 'react';
import classNames from 'classnames';
import {viewBankNames} from '../../../utils';
import styles from './styles.module.scss';

export interface IBubble {
    label: string;
    data: number;
    backgroundColor: string
}
export const banksData:IBubble[] = [
    {
        label: 'Сбербанк',
        data: 35,
        backgroundColor: '#21A038',
    },
    {
        label: 'Тинькофф',
        data: 25,
        backgroundColor: '#FFDD2D',
    },{
        label: 'Альфа-Банк',
        data: 15,
        backgroundColor: '#EF3124',
    },{
        label: 'Банк ВТБ',
        data: 13,
        backgroundColor: '#00AAFF',
    },{
        label: 'Газпром',
        data: 12,
        backgroundColor: '#ee00ff',
    },{
        label: 'Райфайзен',
        data: 7,
        backgroundColor: '#d0ff00',
    },{
        label: 'Акбарс',
        data: 3,
        backgroundColor: '#00ffe1',
    },
];

export const colorsBanks: string[] = [
    '#21A038',
    '#FFDD2D',
    '#EF3124',
    '#00AAFF',
    '#ee00ff',
    '#d0ff00',
    '#00ffe1'
];

export const BubbleChartCard = ({banksDistribution}: {[key:string]: number}) => {
    return (
        <div className={styles.card}>
            <div className={classNames(styles.flex, styles.flexAlignCenter)}>
                <div className={styles.useOfBanks}>
                    <p className={styles.card__title}>Используемые банки</p>
                    <ul className={styles.useOfBanks__list}>
                        {Object.keys(banksDistribution).map((i, index) => (
                            <li key={index} className={styles.useOfBanks__item}>
                            <span className={styles.useOfBanks__itemCircle} style={{
                                backgroundColor: colorsBanks[index]
                            }} />
                                {Object.values(banksDistribution)[index].toFixed(1)}% {viewBankNames[i]}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.bubble}>
                    {Object.keys(banksDistribution).map((item ,index) => (
                        <div key={index} className={styles.bubble__item} style={{
                            width: `${240 / 100 * Object.values(banksDistribution)[index].toFixed(1)}px`,
                            height: `${240 / 100 * Object.values(banksDistribution)[index].toFixed(1)}px`,
                            backgroundColor: colorsBanks[index]
                        }} >
                            <span className={styles.bubble__itemTooltip} style={{color: colorsBanks[index]}}>{viewBankNames[item]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



