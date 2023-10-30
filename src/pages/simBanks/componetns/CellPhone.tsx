import React from 'react';
import {Checked, Unchecked} from '../../../icons';
import {formatPhoneNumber} from '../../../utils';
import styles from './styles.module.scss';

interface ICellPhoneProps {
    // isChecked: boolean;
    // handleChecked: () => void;
    cellPhone: string;
    // interactive: boolean;
}

export const CellPhone = ({/*isChecked, handleChecked, interactive,*/ cellPhone}: ICellPhoneProps) => {
    return (
        <div className={styles.cellPhone}>
            {/*{interactive ?*/}
            {/*    <div*/}
            {/*        className={styles.cellPhoneCheckbox}*/}
            {/*        onClick={handleChecked}*/}
            {/*    >{isChecked ? <Checked/> : <Unchecked/>}*/}
            {/*    </div>*/}
            {/*    : null}*/}
            <p className={styles.cellPhoneText}>{formatPhoneNumber(cellPhone)}</p>
        </div>
    );
};
