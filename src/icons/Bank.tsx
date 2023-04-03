import React from 'react';
import {IconProps} from './types';

export const Bank = ({color}: IconProps) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 17.5H17.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 15.0003V9.16699" stroke={color} strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M8.33325 15.0003V9.16699" stroke={color} strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M11.6667 15.0003V9.16699" stroke={color} strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M15 15.0003V9.16699" stroke={color} strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M10 2L17 7H3L10 2Z" stroke={color} strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>

    );
};
