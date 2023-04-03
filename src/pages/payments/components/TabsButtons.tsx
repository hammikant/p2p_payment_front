import React from 'react';
import classNames from 'classnames';
import {IOption} from '../../../types';
import styles from './styles.module.scss';

interface ITabButtonsProps {
    items: IOption[],
    selected: IOption;
    handleClick: (item: IOption) => void;
}

export const TabsButtons = ({items, selected, handleClick}: ITabButtonsProps) => {
    return (
        <div className={styles.tabButtons}>
            {items.map((item, index) =>
                <button
                    key={index}
                    className={selected.value === item.value ? classNames(styles.button, styles.buttonActive) : styles.button}
                    onClick={() => handleClick(item)}
                >{item.label}</button>
            )}
        </div>
    );
};
