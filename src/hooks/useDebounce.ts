import * as React from 'react';

interface UseDebounceArgs {
    value: string;
    delay: number;
}
export function useDebounce(args: UseDebounceArgs): string {
    const { value, delay } = args;

    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
}
