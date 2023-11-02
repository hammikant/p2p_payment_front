import {BankNames, IOption} from '../types';
import gazrpom from '../assets/images/gazrpom.png';
import raifaisen from '../assets/images/raifaisen.png';
import akbars from '../assets/images/akbars.png';
import vtb from '../assets/images/vtb.png';
import tinkoff from '../assets/images/tinkoff.png';
import alfa from '../assets/images/alfa.png';
import sber from '../assets/images/sber.png';
import sbp from '../assets/images/sbp.png';

export const viewBankNames: { [key: string]: string } = {
    [BankNames.akbars]: 'Акбарс',
    [BankNames.sbp]: 'СПБ',
    [BankNames.alfa]: 'Альфа',
    [BankNames.vtb]: 'ВТБ',
    [BankNames.gazrpom]: 'Газпром',
    [BankNames.raifaisen]: 'Райфайзен',
    [BankNames.tinkoff]: 'Tinkoff',
    [BankNames.sber]: 'Сбербанк',
};

//export const ROLE = 'merchant';
export const ROLE = 'trader';

export const icons: { [key: string]: string } = {
    gazrpom: gazrpom,
    raifaisen: raifaisen,
    akbars: akbars,
    vtb: vtb,
    tinkoff: tinkoff,
    alfa: alfa,
    sber: sber,
    sbp: sbp
};

export const errorsMessage:{[key: string]: string} = {
    '0': 'Упс!',
    'invitation_code': 'Код приглашения'
};

export const optionsBanksList: IOption[] = [
    {label: 'Все банки', value: 'all'},
    {label: 'Акбарс', value: 'akbars'},
    {label: 'Альфа', value: 'alfa'},
    {label: 'ВТБ', value: 'vtb'},
    {label: 'Газпром', value: 'gazrpom'},
    {label: 'Райфайзен', value: 'raifaisen'},
    {label: 'Tinkoff', value: 'tinkoff'},
    {label: 'Сбербанк', value: 'sber'},
];

export const buttonsTabs: IOption[] = [
    {label: 'Все', value: 'all'},
    {label: 'Активный', value: 'isVerified=1'},
    {label: 'Не активный', value: 'isVerified='},
    {label: 'На паузе', value: 'isAcceptingPayments='}
];

export const buttonsTabsCards: IOption[] = [
    {label: 'Все', value: 'all'},
    {label: 'Активный', value: 'active'},
    {label: 'Не активный', value: 'inactive'},
    {label: 'На паузе', value: 'paused'}
];

export const buttonsTabsPayments: IOption[] = [
    {label: 'Все', value: 'all'},
    {label: 'Успех', value: 'approved'},
    {label: 'Заморожено', value: 'frozen'},
    {label: 'Ожидает оплаты', value: 'pending'},
    {label: 'Ожидает подтверждения', value: 'confirmation'},
    {label: 'Просрочен', value: 'overdue'},
    {label: 'Отмена', value: 'canceled'},
];
