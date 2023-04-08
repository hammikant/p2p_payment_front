import {Control, UseFormRegister, UseFormSetValue} from 'react-hook-form';
import {ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes} from 'react';
import {IOption} from '../types';

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
    variant: 'full' | 'outline'
}

export interface ISelect extends HTMLAttributes<HTMLDivElement> {
    label: string;
    control: Control;
    register: UseFormRegister<any>;
    fieldName: string;
    errors: any;
    watch: any;
    setValue: UseFormSetValue<any>;
    customIcon?: ReactNode;
    options: IOption[]
}
