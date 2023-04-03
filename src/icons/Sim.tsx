import React from 'react';
import {IconProps} from './types';

export const Sim = ({color}: IconProps) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 2.5H12.0833L15.8333 6.25V16.6667C15.8333 16.8877 15.7455 17.0996 15.5893 17.2559C15.433 17.4122 15.221 17.5 15 17.5H5C4.77899 17.5 4.56703 17.4122 4.41075 17.2559C4.25447 17.0996 4.16667 16.8877 4.16667 16.6667V3.33333C4.16667 3.11232 4.25447 2.90036 4.41075 2.74408C4.56703 2.5878 4.77899 2.5 5 2.5Z"
                stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <mask id="path-2-inside-1_124_3636" fill="white">
                <rect x="6" y="13" width="3" height="3" rx="1"/>
            </mask>
            <rect x="6" y="13" width="3" height="3" rx="1" stroke={color} strokeWidth="2.8"
                  mask="url(#path-2-inside-1_124_3636)"/>
            <mask id="path-3-inside-2_124_3636" fill="white">
                <rect x="6" y="9" width="3" height="3" rx="1"/>
            </mask>
            <rect x="6" y="9" width="3" height="3" rx="1" stroke={color} strokeWidth="2.8"
                  mask="url(#path-3-inside-2_124_3636)"/>
            <mask id="path-4-inside-3_124_3636" fill="white">
                <rect x="10" y="13" width="3" height="3" rx="1"/>
            </mask>
            <rect x="10" y="13" width="3" height="3" rx="1" stroke={color} strokeWidth="2.8"
                  mask="url(#path-4-inside-3_124_3636)"/>
            <mask id="path-5-inside-4_124_3636" fill="white">
                <rect x="10" y="9" width="3" height="3" rx="1"/>
            </mask>
            <rect x="10" y="9" width="3" height="3" rx="1" stroke={color} strokeWidth="2.8"
                  mask="url(#path-5-inside-4_124_3636)"/>
        </svg>

    );
};
