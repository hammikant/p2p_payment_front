import React, {HTMLAttributes} from 'react';
import styles from './styles.module.scss';

interface IH2Props extends HTMLAttributes<HTMLHeadingElement> {
    text: string
}

export const SubTitle = ({text, ...props}: IH2Props) => {
    return <h2 className={styles.subtitle} {...props}>{text}</h2>;
};
