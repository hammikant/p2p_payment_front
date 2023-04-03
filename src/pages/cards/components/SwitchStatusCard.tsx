import React from 'react';
import {Pause, Stop} from '../../../icons';
import {ISwitchCardStatusProps} from '../store/types';
import styles from './styles.module.scss';

export const SwitchStatusCard = ({handleStop, handlePause}: ISwitchCardStatusProps) => {

    return (
        <div className={styles.switchCardButtons}>
            <span className={styles.switchCardButtonsButton} onClick={handlePause}><Pause/></span>
            <span className={styles.switchCardButtonsButton} onClick={handleStop}><Stop/></span>
        </div>
    );
};
