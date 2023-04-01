import {Control, UseFormRegister} from 'react-hook-form';
import {ButtonHTMLAttributes} from 'react';

export interface IInput {
    label?: string;
    control: Control;
    register: UseFormRegister<any>;
    fieldName: string;
    errors: any;
    onBlur?: () => void;
    onFocus?: () => void;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}
