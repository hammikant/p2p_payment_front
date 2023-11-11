import {declOfNum} from './declOfNum';

const labelsHours = ['час', 'часа', 'часов'];
const labelsMinutes = ['минута', 'минуты', 'минут'];
const labelsSeconds = ['секунда', 'секунды', 'секунд'];

export const convertSecondsToTime = (seconds:number) => {
    if(+seconds.toFixed() === 0) {
        return '0 секунд';
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Number(seconds % 60).toFixed();

    let timeStr: string = remainingSeconds + ` ${declOfNum(+remainingSeconds, labelsSeconds)} `;
    if(minutes > 0) {
        timeStr = minutes + ` ${declOfNum(minutes, labelsMinutes)} ` + timeStr;
    }
    if(hours > 0) {
        timeStr = hours + ` ${declOfNum(hours, labelsHours)} ` + timeStr;
    }


    return  timeStr;
};
