import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputField} from '../../../fields';
import {useAppDispatch} from '../../../hooks/app';
import styles from './styles.module.scss';
import {SearchByCardNum} from './SearchByCardNum';
import {SearchByBank} from './SearchByBank';


export const Filter = () => {


    return (
        <form className={styles.searchByCard}>
            <div className={styles.searchByCardItem}>
                <SearchByCardNum />
            </div>
            <div className={styles.searchByCardItem}>
               <SearchByBank />
            </div>
        </form>
    );
};
