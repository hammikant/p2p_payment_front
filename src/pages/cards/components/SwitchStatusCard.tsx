import React from 'react';
import {Pause, Play, Stop} from '../../../icons';
import {ISwitchCardStatusProps} from '../store/types';
import styles from './styles.module.scss';

export const SwitchStatusCard = ({handleStop, handlePause, handlePlay, status}: ISwitchCardStatusProps) => {

    return (
        <div className={styles.switchCardButtons}>
            {status === 'Активна'
                ? <span className={styles.switchCardButtonsButton} onClick={handlePause}><Pause/></span>
                : <span className={styles.switchCardButtonsButton} onClick={handlePlay}><Play/></span>
            }
            <span className={styles.switchCardButtonsButton} onClick={handleStop}><Stop/></span>
        </div>
    );
};
