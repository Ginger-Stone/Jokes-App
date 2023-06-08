import { ChangeEvent } from "react";
import { JokesPaginate } from "./jokeInterfaces";

interface Button{
    label: string,
    handleClick?: () => void;
    disabled?: boolean,
    cta?:boolean, //set whether the button has a bright bg or not
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

interface Info{
    success:Boolean
    message:string
}

const initialInfoState:Info={
    success:false,
    message:""
}

export {Button, DropdownData, DropdownDataType, DateFormat, Info, initialInfoState}