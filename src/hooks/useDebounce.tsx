import {useEffect, useState} from 'react';

interface IDebounceProps {
    value: string;
    delay: number;
}

export const useDebounce = ({value, delay}: IDebounceProps) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};
