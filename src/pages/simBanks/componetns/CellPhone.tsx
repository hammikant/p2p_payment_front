import React from 'react';
import {Checked, Unchecked} from '../../../icons';
import styles from './styles.module.scss';

interface ICellPhoneProps {
    isChecked: boolean;
    handleChecked: () => void;
    cellPhone: string;
    interactive: boolean;
}

export const CellPhone = ({isChecked, handleChecked, cellPhone, interactive}: ICellPhoneProps) => {
    return (
        <div className={styles.cellPhone}>
            {interactive ?
                <div
                    className={styles.cellPhoneCheckbox}
                    onClick={handleChecked}
                >{isChecked ? <Checked/> : <Unchecked/>}
                </div>
                : null}
            <p className={styles.cellPhoneText}>{cellPhone}</p>
        </div>
    );
};
