import {ReactNode} from 'react';

export interface IMainLayout {
    titlePage: string;
    descriptionPage?: string | ReactNode;
    children: ReactNode
}
