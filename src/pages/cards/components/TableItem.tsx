import React, {useState} from 'react';
import {ICard} from '../store/types';
import {useAppDispatch} from '../../../hooks/app';
import {changeStatusCard} from '../store/cards.thunk';
import {icons} from '../../../utils/constants';
import styles from './styles.module.scss';
import {SwitchStatusCard} from './SwitchStatusCard';


const colorsStatus: { [key: string]: string } = {
    'active' : '#91F230',
    'paused': '#667180',
    'inactive': '#F22451',
};

const CardsStatus: { [key: string]: string } = {
    'active' : 'Активна',
    'paused': 'На паузе',
    'inactive': 'Не активна',
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

    const cardData = () => { 
        const partsCard = item.number.toString().match(/.{1,4}/g);
        const result = partsCard.join(' ');
        return (result);
    };
    
    return (
        <div
            className={styles.TableItem}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
        <div className={styles.tableItem}>
            <div className={styles.item}>
                <img src={icons[item.bank as string]} alt={item.bank}/>
                <span className={styles.itemText}>{cardData()}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.date}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.id}</span>
            </div>
            <div className={styles.item}></div>
            <div className={styles.item}>
                {isHover
                    ? <SwitchStatusCard
                        status={item.status}
                        handlePause={handlePause}
                        handlePlay={handlePlay}
                        handleStop={handleStop}/>
                    : (<span className={styles.itemText}
                             style={{color: colorsStatus[item.status as string]}}>{CardsStatus[item.status as string]}</span>)}
            </div>
        </div>
        </div>
    );
};
