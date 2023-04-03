import React, {useState} from 'react';
import {Title} from '../../fields';
import {useAppSelector} from '../../hooks/app';
import {Drop, Esc, Settings} from '../../icons';
import {IHeader} from './types';
import styles from './styles.module.scss';

export const Header = ({title, descriptionPage}: IHeader) => {
    const {user} = useAppSelector(state => state.auth);
    const [isDrop, setDrop] = useState<boolean>(false);
    return (
        <div className={styles.header}>
            <div>
                <Title text={title}/>
                {descriptionPage ? <p className={styles.headerDescription}>{descriptionPage}</p> : null}
            </div>
            <div
                className={styles.menu}
                onMouseEnter={() => setDrop(true)}
                onMouseLeave={() => setDrop(false)}
            >
                <div className={styles.menuTextWrap}>
                    <span className={styles.menuText}>{user.email}</span>
                    <Drop color={'#91F230'}/>
                </div>
                {
                    isDrop
                        ? (
                            <ul className={styles.menuDrop}>
                                <li className={styles.menuDropText}>
                                    <Settings/>
                                    <span>Настройки</span>
                                </li>
                                <li className={styles.menuDropText}>
                                    <Esc/>
                                    <span>Выход</span>
                                </li>
                            </ul>
                        ) : null
                }
            </div>
        </div>
    );
};
