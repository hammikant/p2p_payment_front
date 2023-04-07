import React, {HTMLAttributes} from 'react';
import {Copy} from '../icons';
import styles from './styles.module.scss';

interface IOutputClipBoard extends HTMLAttributes<HTMLSpanElement> {
    text: string;
    isCopyPress: boolean;
}

export const OutputClipBoard = ({text, isCopyPress, ...props}: IOutputClipBoard) => {
    return (
        <div className={styles.clipBoard}>
            <div className={styles.clipBoardOutput}>
                <span className={styles.clipBoardText}>{text}</span>
                <span
                    className={styles.clipBoardIcon}
                    {...props}
                >
                <Copy color={isCopyPress ? '#667180' : '#ffffff'}/>
            </span>
            </div>
        </div>
    );
};
