import {BankNames} from '../types';
import gazprom from '../assets/images/gazprom.png';
import raiffeisen from '../assets/images/raiffeisen.png';
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
    [BankNames.gazprom]: 'Газпром',
    [BankNames.raiffeisen]: 'Райфайзен',
    [BankNames.tinkoff]: 'Tinkoff',
    [BankNames.sber]: 'Сбербанк',
};

//export const ROLE = 'merchant';
export const ROLE = 'trader';

export const icons: { [key: string]: string } = {
    'Газпром': gazprom,
    'Райфайзен': raiffeisen,
    'Акбарс': akbars,
    'ВТБ': vtb,
    'Тинькофф': tinkoff,
    'Альфа': alfa,
    'Сбербанк': sber,
    'Спб': sbp
};
