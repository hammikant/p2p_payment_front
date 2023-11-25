import React from 'react';
import {shaderColor, viewBankNames} from '../../../utils';
import {ProcessingTimeDistribution} from '../store/types';
import {convertSecondsToTime} from '../../../utils/convertSecondsToTime';
import styles from './styles.module.scss';
import {colorsBanks, IBubble} from './BubbleChartCard';

interface ProgressCardProps {
    title: string;
    items: ProcessingTimeDistribution  | null
}

export const ProgressCard = ({title, items}:ProgressCardProps) => {

    return (
        <div className={styles.card}>
            <p className={styles.card__title}>{title}</p>
            {Object.keys(items).map((item, index) => {
                const sec = Object.values(items)[index].averageApprovalTime;
                const time = convertSecondsToTime(sec);
                return (
                    <div key={index} className={styles.progress}>
                        <div className={styles.progress__labelBox}>
                            <p className={styles.progress__label}>{viewBankNames[item]}</p>
                            <p className={styles.progress__date}>{time}</p>
                        </div>
                        <div className={styles.track}>
                        <span className={styles.track__line} style={{
                            width: `${Object.values(items)[index].percentage}%`,
                            background: `linear-gradient(to right,${colorsBanks[index]}, ${shaderColor(colorsBanks[index], 20)})`
                        }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
