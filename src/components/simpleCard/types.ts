import {ReactNode} from 'react';

export interface ISimpleCardProps {
    name: string;
    data: string;
    additionalData: string;
    footer?: ReactNode;
}
