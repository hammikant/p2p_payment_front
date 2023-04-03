import React from 'react';
import {IconProps} from './types';

export const EyeClose = ({color}: IconProps) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M2.82942 6.64267C1.99291 7.62416 1.37001 8.76729 1 10C2.15523 13.856 5.7479 16.6667 10.0004 16.6667C10.8883 16.6667 11.7467 16.544 12.5604 16.3156M4.83945 4.86933C6.37078 3.86472 8.16573 3.33051 10.0004 3.33333C14.253 3.33333 17.8448 6.144 19 9.99822C18.3668 12.1043 17.0078 13.9214 15.1614 15.1307M4.83945 4.86933L1.95316 2M4.83945 4.86933L8.10307 8.11378M15.1614 15.1307L18.0477 18M15.1614 15.1307L11.8978 11.8862M11.8978 11.8862C12.1469 11.6386 12.3445 11.3446 12.4793 11.021C12.6142 10.6975 12.6836 10.3507 12.6836 10.0004C12.6836 9.65022 12.6142 9.30343 12.4793 8.97987C12.3445 8.65631 12.1469 8.36231 11.8978 8.11467C11.6487 7.86702 11.353 7.67058 11.0275 7.53656C10.702 7.40253 10.3532 7.33355 10.0009 7.33355C9.6486 7.33355 9.29976 7.40253 8.97429 7.53656C8.64881 7.67058 8.35308 7.86702 8.10397 8.11467M11.8969 11.8853L8.10486 8.11556"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};