import { ChangeEvent } from "react";
import { JokesPaginate } from "./jokeInterfaces";

interface Button{
    label: string,
    handleClick: () => void;
    disabled?: boolean,
}

type DropdownDataType = number[]|string[];

interface DropdownData {
    currentSelection: number|string,
    availableOptions: DropdownDataType
    handleSelectionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    
}

const DateFormat: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric"
}

export {Button, DropdownData, DropdownDataType, DateFormat}