import React from 'react';
import {IconProps} from './types';

export const Deposit = ({color}: IconProps) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.7692 6.18182L16.2564 15.2029C16.2288 15.6891 16.0225 16.146 15.6797 16.4801C15.337 16.8142 14.8837 17.0002 14.4127 17H5.58728C5.11628 17.0002 4.66301 16.8142 4.32027 16.4801C3.97752 16.146 3.77122 15.6891 3.74359 15.2029L3.23077 6.18182M8.35897 9.36364H11.641M2.92308 6.18182H17.0769C17.5865 6.18182 18 5.75418 18 5.22727V3.95455C18 3.42764 17.5865 3 17.0769 3H2.92308C2.41354 3 2 3.42764 2 3.95455V5.22727C2 5.75418 2.41354 6.18182 2.92308 6.18182Z"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
};
