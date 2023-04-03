import React from 'react';
import {IconProps} from './types';

export const EyeOpen = ({color}: IconProps) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M1.04651 10.3005C0.984497 10.107 0.984497 9.89772 1.04651 9.70413C2.29286 5.80933 5.83063 3 10.0001 3C14.1678 3 17.7038 5.80653 18.9528 9.69947C19.0157 9.89267 19.0157 10.1017 18.9528 10.2959C17.7074 14.1907 14.1696 17 10.0001 17C5.83243 17 2.29646 14.1935 1.04741 10.3005H1.04651Z"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M13 10C13 10.7956 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13C9.20435 13 8.44129 12.6839 7.87868 12.1213C7.31607 11.5587 7 10.7956 7 10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10V10Z"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};
