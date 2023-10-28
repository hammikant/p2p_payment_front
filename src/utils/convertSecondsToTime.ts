export const convertSecondsToTime = (sec:number) => {

    const time = new Date();
    time.setSeconds(sec);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Format the time as a string with leading zeros
    return hours.toString().padStart(2, '0') + 'ч ' +
        minutes.toString().padStart(2, '0') + 'м ' +
        seconds.toString().padStart(2, '0') + 'с';
};
