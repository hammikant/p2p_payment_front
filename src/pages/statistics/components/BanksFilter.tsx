import React, {useState} from 'react';
import {IOption} from '../../../types';
import {optionsBanksList} from '../../../utils/constants';
import styles from './styles.module.scss';



export const BanksFilter = ({handleSelectBank}:{handleSelectBank: (item:IOption) => void;}) => {
    const [selected, setSelected] = useState<IOption>(optionsBanksList[0]);
    const [hover, setHover] = useState<boolean>(false);
    const [showList, setShowList] = useState<boolean>(false);
    return (
        <div className={styles.selectBanks}
        onMouseOver={() => setShowList(true)}
        onMouseOut={() => setShowList(false)}
        >
            <div className={styles.selectBanksOutput}
                 onMouseOver={() => setHover(true)}
                 onMouseOut={() => setHover(false)}
            >
                <span
                    className={styles.selectBanksOutput__head}
                >{selected.label}</span>
                <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4L1.27146e-07 4.76995e-08L6 -4.76837e-07L3 4Z" fill={hover ? '#91F230' : '#667180'}/>
                </svg>
            </div>
            {showList ? <ul className={styles.options}>
                {optionsBanksList.map(item => (
                    <li key={item.value} className={styles.options__item} onClick={() => {
                        handleSelectBank(item);
                        setSelected(item);
                        setShowList(false);
                    }}>
                        <span className={styles.options__text}>{item.label}</span>
                    </li>
                ))}
            </ul> : null}
        </div>
    );
};

