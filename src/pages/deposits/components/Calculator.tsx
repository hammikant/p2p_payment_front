import React, {ChangeEvent, useState} from 'react';
import {ICalculatorProps} from '../store/types';
import styles from './styles.module.scss';

export const Calculator = ({exchangeRates, handleCalculation}: ICalculatorProps) => {
    const [sum, setSum] = useState<string>('');


    return (
        <div className={styles.calculator}>
            <h3 className={styles.calculatorTitle}>Калькулятор</h3>
            <div className={'row'}>
                <div className={'col'}>
                    <label className={styles.label}>Сумма</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={'number'}
                            className={styles.input}
                            value={sum}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSum(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    handleCalculation(Number(sum));
                                }
                            }}
                        />
                        <span className={styles.inputIcon}>₽</span>
                    </div>
                </div>
                <div className={'col'}>
                    <label className={styles.label}>Курс</label>
                    <div className={styles.inputWrapper}>
                        <input readOnly value={exchangeRates} className={styles.input}/>
                        <span className={styles.inputIcon}>USDT</span>
                    </div>
                </div>
            </div>
            <span
                className={styles.calculatorResult}>
                Доход: {(Number(sum) * exchangeRates / 100 * 1.5).toFixed(2)} ₽
            </span>
        </div>
    );
};
