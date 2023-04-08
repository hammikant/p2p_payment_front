import React, {useEffect} from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import * as am5xy from '@amcharts/amcharts5/xy';
import {IChart} from '../store/types';
import styles from './styles.module.scss';

export const Chart = ({items}: { items: IChart[] }) => {

    useEffect(() => {
        const root = am5.Root.new('chart');

        root.setThemes([
            am5themes_Dark.new(root)
        ]);

        const chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: 'panX',
            wheelY: 'zoomX',
            pinchZoomX: true
        }));

        const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {
            behavior: 'none'
        }));
        cursor.lineY.set('visible', false);

        // ===========================================
        // Generate random data
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        let value = 100;

        function generateData(item: IChart) {
            value = Math.round((Math.random() * 10 - 5) + value);
            am5.time.add(date, 'day', 1);

            return {
                date: date.getTime(),
                value: value,
                income: item.income,
                turnover: item.turnover,
                create_as: item.create_as
            };
        }

        function generateDatas(items: IChart[]) {
            const data = [];
            for (var i = 0; i < items.length; ++i) {
                data.push(generateData(items[i]));
            }
            return data;
        }


        // Create axes
        const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.5,
            baseInterval: {
                timeUnit: 'day',
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {
                pan: 'zoom'
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(root, {
                pan: 'zoom'
            })
        }));


        // Add series
        const series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
            name: 'Series',
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: 'value',
            valueXField: 'date',
            tooltip: am5.Tooltip.new(root, {
                labelHTML: '<span>{create_as}</span></br><span>Доход: {income} ₽</span></br><span>Оборот: {turnover} ₽</span>',
            })
        }));


        series.fills.template.setAll({
            visible: true,
            fillOpacity: 0.2
        });

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationY: 0,
                sprite: am5.Circle.new(root, {
                    radius: 4,
                    stroke: root.interfaceColors.get('background'),
                    strokeWidth: 2,
                    fill: series.get('fill', am5.color('#91F230'))
                })
            });
        });


        // Add scrollbar
        chart.set('scrollbarX', am5.Scrollbar.new(root, {
            orientation: 'horizontal'
        }));

        series.set('stroke', am5.color('#91F230'));
        series.set('fill', am5.color('#91F230'));

        const data = generateDatas(items);
        series.data.setAll(data);


        // Make stuff animate on load
        series.appear(1000);
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div id="chart" className={styles.chart}/>
    );
};

