import {HTMLAttributes, ReactNode} from 'react';

export interface ISimpleCardProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    data: string;
    additionalData: string;
    footer?: ReactNode;
}
