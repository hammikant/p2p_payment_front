import {ReactNode} from 'react';

export interface INavItemProps {
    isActive: boolean;
    path: string;
    text: string;
    icon: ReactNode;
}
