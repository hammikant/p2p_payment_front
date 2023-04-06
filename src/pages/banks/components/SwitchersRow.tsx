import React, {ReactNode} from 'react';
import styles from './styles.module.scss';

export const SwitchersRow = ({children}: { children: ReactNode }) => {
    return (
        <div className={styles.switchers}>
            {children}
        </div>
    );
};
