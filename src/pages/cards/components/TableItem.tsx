import React, {useState} from 'react';
import {ICard} from '../store/types';
import gazprom from '../../../assets/images/gazprom.png';
import raiffeisen from '../../../assets/images/raiffeisen.png';
import akbars from '../../../assets/images/akbars.png';
import vtb from '../../../assets/images/vtb.png';
import tinkoff from '../../../assets/images/tinkoff.png';
import alfa from '../../../assets/images/alfa.png';
import sber from '../../../assets/images/sber.png';
import sbp from '../../../assets/images/sbp.png';
import {useAppDispatch} from '../../../hooks/app';
import {changeStatusCard} from '../store/cards.thunk';
import styles from './styles.module.scss';
import {SwitchStatusCard} from './SwitchStatusCard';

const icons: { [key: string]: string } = {
    gazprom,
    raiffeisen,
    akbars,
    vtb,
    tinkoff,
    alfa,
    sber,
    sbp
};

const colorsStatus: { [key: string]: string } = {
    'Активна': '#91F230',
    'На паузе': '#667180',
    'Не активна': '#F22451',
};

export const TableItem = ({item}: { item: ICard }) => {
    const dispatch = useAppDispatch();
    const [isHover, setHover] = useState<boolean>(false);

    const handlePause = () => {
        dispatch(changeStatusCard({id: item.id.toString(), status: 'pause'}));
    };
    const handleStop = () => {
        dispatch(changeStatusCard({id: item.id.toString(), status: 'inactive'}));
    };
    return (
        <div
            className={styles.tableItem}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={styles.item}>
                <img src={icons[item.bankName as string]} alt={item.bankName}/>
                <span className={styles.itemText}>{item.num}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.data}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.id}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}
                      style={{color: item.bank === 'Не подключён' ? '#667180' : '#ffffff'}}>{item.bank}</span>
            </div>
            <div className={styles.item}>
                {isHover
                    ? <SwitchStatusCard handlePause={handlePause} handleStop={handleStop}/>
                    : (<span className={styles.itemText}
                             style={{color: colorsStatus[item.status as string]}}>{item.status}</span>)}
            </div>
        </div>
    );
};
