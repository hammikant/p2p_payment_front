import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {IOption} from '../types';
import {ChevronDown} from '../icons';
import {ISelect} from './types';
import styles from './styles.module.scss';

export const Select = (
    {
        label,
        control,
        register,
        errors,
        fieldName,
        setValue,
        options,
        customIcon,
        onChangeItem,
        ...props
    }: ISelect) => {

    const [showDrop, setShowDrop] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const handleSelect = (item: IOption) => {
        setShowDrop(false);
        setValue(fieldName, item.value);
        setText(item.label);
        if(onChangeItem) {
            onChangeItem(item);
        }
    };

    return (
        <Controller
            control={control}
            name={fieldName}
            render={({field: {name}, fieldState: {error}}) => (
                <>
                    <label className={styles.label}>{label}</label>
                    <div
                        className={styles.select}
                        style={{backgroundColor: '#0D1114', ...props.style}}
                        onMouseEnter={() => setShowDrop(true)}
                        onMouseLeave={() => setShowDrop(false)}
                    >
                        {customIcon
                            ? (<span className={styles.selectCustomIcon}>
                                {customIcon}
                                </span>)
                            : null}
                        <output
                            className={styles.selectOutput}
                            {...register(fieldName)}
                        >{text}</output>
                        {customIcon === undefined ? <span className={styles.selectIcon}><ChevronDown/></span> : null}
                        {
                            showDrop
                                ? (
                                    <ul className={styles.selectList}>
                                        {options.map((item, index) => (
                                            <li key={index} className={styles.selectItem}
                                                onClick={() => handleSelect(item)}>{item.label}</li>
                                        ))}
                                    </ul>
                                ) : null
                        }
                    </div>
                </>
            )}
        />
    );
};
