import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {SubTitle} from '../../fields';
import {Edit} from '../../icons';
import styles from './styles.module.scss';

interface IChangeableTitleParops {
    title: string;
    handleChangeTitle: (title: string) => void;
}

export const ChangeableTitle = ({title, handleChangeTitle}: IChangeableTitleParops) => {
    const refHead = useRef<HTMLDivElement | null>(null);
    const [text, setText] = useState<string>(title);
    const [isEdit, setEdit] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        if (refHead) {
            const width = refHead.current.clientWidth;
            setWidth(width + 10);
        }
    }, []);

    const saveText = () => {
        setEdit(false);
        handleChangeTitle(text);
    };

    return (
        <div className={styles.changeableTitle}>
            {!isEdit
                ? (<div className={styles.changeableTitleTitleWrapper} ref={refHead}>
                    <SubTitle text={text}/>
                </div>)
                : <input
                    className={styles.changeableTitleInput}
                    autoFocus={isEdit}
                    value={text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        e.key === 'Enter' && saveText();
                    }}
                    onBlur={saveText}
                    style={{width}}
                />
            }
            <div className={styles.changeableTitleIcon} onClick={() => setEdit(!isEdit)}>
                <Edit color={isEdit ? '#ffffff' : '#667180'}/>
            </div>
        </div>
    );
};
