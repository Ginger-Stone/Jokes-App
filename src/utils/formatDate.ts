import { DateFormat } from "../types/interfaces";

export function formatDate(timestamp: number){
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", DateFormat);
}