import React from 'react';
import {IconProps} from './types';

export const Stat = ({color}: IconProps) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17 13.2216C16.5033 14.3991 15.7263 15.4367 14.7371 16.2437C13.7478 17.0507 12.5764 17.6025 11.3253 17.8509C10.0741 18.0992 8.78135 18.0366 7.55992 17.6685C6.33849 17.3004 5.22562 16.638 4.31861 15.7391C3.41159 14.8403 2.73805 13.7325 2.35687 12.5125C1.97568 11.2924 1.89846 9.99739 2.13196 8.74055C2.36546 7.48371 2.90256 6.30333 3.69631 5.30262C4.49006 4.30191 5.51629 3.51133 6.68528 3"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M18 10C18 8.94943 17.7931 7.90914 17.391 6.93853C16.989 5.96793 16.3997 5.08601 15.6569 4.34315C14.914 3.60028 14.0321 3.011 13.0615 2.60896C12.0909 2.20693 11.0506 2 10 2V10H18Z"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};
