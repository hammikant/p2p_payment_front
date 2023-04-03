import {Control, UseFormRegister} from 'react-hook-form';
import {ButtonHTMLAttributes, InputHTMLAttributes, ReactNode} from 'react';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
    control: Control;
    register: UseFormRegister<any>;
    fieldName: string;
    errors: any;
    backgroundLight: boolean;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}
