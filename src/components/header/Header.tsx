import React, {useState} from 'react';
import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';
import {Title} from '../../fields';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {Drop, Esc, Settings} from '../../icons';
import {clearStorage} from '../../store/app.slice';
import {setAppLoader} from '../../pages/auth/store/auth.slice';
import {IHeader} from './types';
import styles from './styles.module.scss';

export const Header = ({title, descriptionPage}: IHeader) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {commonData} = useAppSelector(state => state.app);
    const [isDrop, setDrop] = useState<boolean>(false);

    const handleLogout = () => {
        dispatch(setAppLoader(true));
        dispatch(clearStorage());
        setTimeout(() => {
            dispatch(setAppLoader(false));
        }, 1000);
    };
 
    return (
        <div className={classNames(styles.header, 'row')}>
            <div className={'col'}>
                <Title text={title}/>
                {descriptionPage ? <div className={styles.headerDescription}>{descriptionPage}</div> :
                    <div className={'space-top-24'}/>}
            </div>
            <div
                className={classNames(styles.menu, 'col')}
                onMouseEnter={() => setDrop(true)}
                onMouseLeave={() => setDrop(false)}
            >
                <div className={styles.menuTextWrap}>
                    <span
                        className={styles.menuText}>{commonData.email}</span>
                    <Drop color={'#91F230'}/>
                </div>
                {
                    isDrop
                        ? (
                            <ul className={styles.menuDrop}>
                                <li className={styles.menuDropText} onClick={() => navigate('/settings')}>
                                    <Settings/>
                                    <span>Настройки</span>
                                </li>
                                <li className={styles.menuDropText} onClick={handleLogout}>
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
