interface FormatDateProps {
    date: Date;
    period?: string
}

export const formatDate = ({date, period = undefined}: FormatDateProps) => {
    let d = '';
    if (period) {
        switch (period) {
            case 'week':
                date.setDate(date.getDate() - 7);
                return d = str(date);
            case 'mouth':
                date.setMonth(date.getMonth() - 1);
                return d = str(date);
            case 'year':
                date.setFullYear(date.getFullYear() - 1);
                return d = str(date);
            default:
                return d = str(date);
        }
    }

    return str(date);
};

function str(date: Date) {
    const mount = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    return `${date.getFullYear()}-${mount}-${day}`;
}
