import React from 'react';
import {Pause, Play, Stop} from '../../../icons';
import {ISwitchCardStatusProps} from '../store/types';
import styles from './styles.module.scss';
import {StatusCard} from './TableItem';

export const SwitchStatusCard = ({handleStop, handlePause, handlePlay, status}: ISwitchCardStatusProps) => {

    return (
        <div className={styles.switchCardButtons}>
            {status === StatusCard.active
                ? <span className={styles.switchCardButtonsButton} onClick={handlePause}><Pause/></span>
                : <span className={styles.switchCardButtonsButton} onClick={() => handlePlay(status)}>
                    {status === StatusCard.paused ? <Pause/> : <Play/>}
                </span>
            }
            <span className={styles.switchCardButtonsButton} onClick={handleStop}><Stop/></span>
        </div>
    );
};
