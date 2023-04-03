import React from 'react';
import {IconProps} from './types';

export const Drop = ({color}: IconProps) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 10L5 6L11 6L8 10Z" fill={color}/>
        </svg>
    );
};
