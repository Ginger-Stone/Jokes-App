interface Button{
    label: string,
    handleClick: () => void;
    disabled?: boolean,
}

const DateFormat: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric"
}

export {Button, DateFormat}