import React from 'react';
import {ICellPhoneSimBank} from '../store/types';
import styles from './styles.module.scss';
import {CellPhone} from './CellPhone';

interface ICellPhoneListProps {
    items: string[];
}

export const CellPhoneList = ({items}: ICellPhoneListProps) => {
    return (
        <div className={styles.simBankTableContent}>
            {items.map((item, index) =>
                <CellPhone
                    key={`${item}-${index}`}
                    cellPhone={item}
                    // isChecked={item.status === 'active'}
                    // interactive={interactive}
                    // handleChecked={() => handleChecked(item.id)}
                />)}
        </div>
    );
};
