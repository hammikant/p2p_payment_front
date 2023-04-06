import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import Switch from 'react-switch';
import styles from './styles.module.scss';

interface ISwitcherProps {
    row: boolean;
    label: string;
    handleSwitch: (checked: boolean) => void;
    checked: boolean;
}

export const Switcher = ({row, label, checked = false, handleSwitch}: ISwitcherProps) => {
    const [status, setStatus] = useState<boolean>(checked);

    useEffect(() => {
        setStatus(checked);
    }, [checked]);
    const handleSwitcher = (checked: boolean) => {
        setStatus(checked);
        handleSwitch(checked);
    };
    return (
        <div className={row ? styles.switcher : classNames(styles.switcher, styles.switcherColumn)}>
            <label className={styles.switcherLabel}>{label}</label>
            <Switch
                onColor={'#91F230'}
                offColor={'#303740'}
                checkedIcon={false}
                uncheckedIcon={false}
                width={44}
                height={24}
                activeBoxShadow={'#91F230'}
                checked={status}
                onChange={checked => handleSwitcher(checked)}/>
        </div>
    );
};
