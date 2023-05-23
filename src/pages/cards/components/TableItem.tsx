import React, {useState} from 'react';
import {ICard} from '../store/types';
import {useAppDispatch} from '../../../hooks/app';
import {changeStatusCard} from '../store/cards.thunk';
import {icons} from '../../../utils/constants';
import styles from './styles.module.scss';
import {SwitchStatusCard} from './SwitchStatusCard';


const colorsStatus: { [key: string]: string } = {
    'Активна': '#91F230',
    'На паузе': '#667180',
    'Не активна': '#F22451',
};


export const TableItem = ({item}: { item: ICard }) => {
    const dispatch = useAppDispatch();
    const [isHover, setHover] = useState<boolean>(false);

    const handlePause = () => { //'Активна' | 'Не активна' | 'На паузе'
        dispatch(changeStatusCard({id: item.id.toString(), status: 'На паузе'}));
    };

    const handlePlay = () => {
        dispatch(changeStatusCard({id: item.id.toString(), status: 'Активна'}));
    };

    const handleStop = () => {
        dispatch(changeStatusCard({id: item.id.toString(), status: 'Не активна'}));
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
                <span className={styles.itemText}>{item.date}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.id}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}
                      style={{color: item.bank === 'Не подключён' ? '#667180' : '#ffffff'}}>{item.bankName}</span>
            </div>
            <div className={styles.item}>
                {isHover
                    ? <SwitchStatusCard
                        status={item.status}
                        handlePause={handlePause}
                        handlePlay={handlePlay}
                        handleStop={handleStop}/>
                    : (<span className={styles.itemText}
                             style={{color: colorsStatus[item.status as string]}}>{item.status}</span>)}
            </div>
        </div>
    );
};
