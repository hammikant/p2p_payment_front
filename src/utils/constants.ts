import {BankNames} from '../types';
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
