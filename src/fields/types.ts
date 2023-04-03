import {Control, UseFormRegister} from 'react-hook-form';
import {ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes} from 'react';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
    control: Control;
    register: UseFormRegister<any>;
    fieldName: string;
    errors: any;
    backgroundLight: boolean;
}

export interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
