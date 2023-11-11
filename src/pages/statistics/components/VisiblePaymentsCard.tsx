import React, {useEffect} from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {IOption} from '../../../types';
import {PaymentStatus, PaymentStatusDistribution} from '../store/types';
import styles from './styles.module.scss';
import {BanksFilter} from './BanksFilter';
const check = require('../../../assets/images/check.png');
const cancel = require('../../../assets/images/cancel.png');
const freeze = require('../../../assets/images/snow-flake.png');

const icons = [check, cancel, freeze];

interface VisiblePayment {
    percentage: string;
    payments: string;
    status: string;
}

const mapPaymentStatusDistribution = (data: PaymentStatusDistribution): VisiblePayment[] => {
    const d = {...data};
    const statuses = ['подтверждено', 'отменено', 'заморожено'];
    delete d.totalPayments;
    return Object.entries(d).map(([key, value]: any, index) => ({
        ...value,
        status: statuses[index]
    }));
};

const isThousand = (num: string) => {
    const numLength = num.length;
    if(numLength >= 4) {
        return num.substring(0, numLength - 3) + 'k';
    }
    return num;
};

interface VisiblePaymentsCardProps {
    paymentStatusDistribution: PaymentStatusDistribution;
    handleSelectBank: (item: IOption) => void
};


export const VisiblePaymentsCard = ({handleSelectBank, paymentStatusDistribution}: VisiblePaymentsCardProps) => {

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
            percent: paymentStatusDistribution.approved.percentage,
            sliceSettings: {
                fill: am5.color('#91F230'),
            }
        }, {
            type: 'отменено',
            percent: paymentStatusDistribution.canceled.percentage,
            sliceSettings: {
                fill: am5.color('#F22451'),
            }
        }, {
            type: 'заморожено',
            percent: paymentStatusDistribution.frozen.percentage,
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

    const list = mapPaymentStatusDistribution(paymentStatusDistribution);

    console.log('@@@ ',paymentStatusDistribution.totalPayments.toString().length);

    return (
        <div className={styles.card}>
            <div className={styles.flex}>
                <div className={styles.visiblePayments}>
                    <p className={styles.card__title}>Проходимость платежей</p>
                    <ul className={styles.visiblePayments__list}>
                        {list.map((item, index) => (
                            <li key={index} className={styles.visiblePayments__listItem}>
                                <img src={icons[index]} className={styles.visiblePayments__image} alt={'icon'}/>
                                <div className={styles.visiblePayments__listBody}>
                                    <p className={styles.visiblePayments__listName}>
                                        {item.percentage}%
                                        <span className={styles.visiblePayments__listNameSmallText}>
                                        ({isThousand(item.payments)})
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
                        <div className={styles.totalPayments}>
                            <p className={styles.totalPayments__textBig}>{paymentStatusDistribution.totalPayments}</p>
                            <p className={styles.totalPayments__text}>платежей</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
