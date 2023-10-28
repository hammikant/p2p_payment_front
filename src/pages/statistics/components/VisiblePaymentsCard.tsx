import React, {useEffect} from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {IOption} from '../../../types';
import styles from './styles.module.scss';
import {BanksFilter} from './BanksFilter';
const check = require('../../../assets/images/check.png');
const cancel = require('../../../assets/images/cancel.png');
const freeze = require('../../../assets/images/snow-flake.png');

const icons = [check, cancel, freeze];

interface VisiblePayment {
    percent: string;
    count: string;
    status: string;
}

const visiblePayments: VisiblePayment[] = [
    {percent: '64', count: '1.74к', status: 'подтверждено'},
    {percent: '15', count: '408', status: 'отменено'},
    {percent: '21', count: '571', status: 'заморожено'},
];

export const VisiblePaymentsCard = ({handleSelectBank}:{handleSelectBank: (item:IOption) => void}) => {

    useEffect(() => {
        const root = am5.Root.new('chart');
        root._logo.dispose();

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                //@ts-ignore
                layout: root.verticalHorizontal,
                innerRadius: am5.percent(80)
            })
        );


        const data = [{
            type: 'подтверждено',
            percent: 64,
            sliceSettings: {
                fill: am5.color('#91F230'),
            }
        }, {
            type: 'отменено',
            percent: 15,
            sliceSettings: {
                fill: am5.color('#F22451'),
            }
        }, {
            type: 'заморожено',
            percent: 31,
            sliceSettings: {
                fill: am5.color('#4972CF'),
            }
        }];

        // Create series
        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: 'Series',
                valueField: 'percent',
                categoryField: 'type'
            })
        );

        series.slices.template.setAll({
            templateField: 'sliceSettings'
        });

        series.data.setAll(data);

        series.slices.template.setAll({
            stroke: am5.color('#1B1F26'),
            strokeWidth: 4,
            cornerRadius: 50,
            stateAnimationEasing: am5.ease.out(am5.ease.cubic)
        });
        series.slices.template.states.create('hover', {disabled: true});
        series.slices.template.states.create('active', {shiftRadius: 0});
        series.labels.template.set('forceHidden', true);
        series.slices.template.set('toggleKey', 'none');
        series.slices.template.set('tooltipText', '{category} {value}%');

        return () => root.dispose();
    }, []);

    return (
        <div className={styles.card}>
            <div className={styles.flex}>
                <div className={styles.visiblePayments}>
                    <p className={styles.card__title}>Проходимость платежей</p>
                    <ul className={styles.visiblePayments__list}>
                        {visiblePayments.map((item, index) => (
                            <li key={index} className={styles.visiblePayments__listItem}>
                                <img src={icons[index]} className={styles.visiblePayments__image} alt={'icon'}/>
                                <div className={styles.visiblePayments__listBody}>
                                    <p className={styles.visiblePayments__listName}>
                                        {item.percent}%
                                        <span className={styles.visiblePayments__listNameSmallText}>
                                        ({item.count})
                                    </span>
                                    </p>
                                    <p className={styles.visiblePayments__listText}>{item.status}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                <div className={styles.selectBanks}>
                    <BanksFilter handleSelectBank={handleSelectBank}/>
                </div>
                <div id={'chart'} className={styles.pie} style={{width: '240px', height: '240px'}}>
                    <p className={styles.pie__textBig}>2.72k</p>
                    <p className={styles.pie__text}>платежей</p>
                </div>
                </div>
            </div>
        </div>
    );
};
