import React from 'react';

export const ArrowLeftRight = ({color}: { color: string }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1667 9.16667L17.5 5.83333L14.1667 2.5" stroke={color} strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 5.83301H7.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M5.83333 17.4997L2.5 14.1663L5.83333 10.833" stroke={color} strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 14.167H2.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};
