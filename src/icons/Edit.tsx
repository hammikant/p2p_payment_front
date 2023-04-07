import React from 'react';
import {IconProps} from './types';

export const Edit = ({color}: IconProps) => {
    return (
        <svg width="22" height="22" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.42043 2.6114L11.3886 5.57957M11.696 1.43468L12.5653 2.30404C13.1449 2.88361 13.1449 3.82328 12.5653 4.40285L3.96817 13H1V10.0318L9.59715 1.43468C10.1767 0.855107 11.1164 0.855107 11.696 1.43468Z"
                stroke={color} strokeWidth="1.4" strokeLinecap="square"/>
        </svg>
    );
};
