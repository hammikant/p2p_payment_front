import React from 'react';
import {ICellPhoneSimBank} from '../store/types';
import styles from './styles.module.scss';
import {CellPhone} from './CellPhone';

interface ICellPhoneListProps {
    items: ICellPhoneSimBank[];
    handleChecked?: (id: number) => void;
    interactive: boolean;
}

export const CellPhoneList = ({items, handleChecked, interactive}: ICellPhoneListProps) => {
    return (
        <div className={styles.simBankTableContent}>
            {items.map(item =>
                <CellPhone
                    key={item.id}
                    cellPhone={item.cellPhone}
                    isChecked={item.status === 'active'}
                    interactive={interactive}
                    handleChecked={() => handleChecked(item.id)}
                />)}
        </div>
    );
};
