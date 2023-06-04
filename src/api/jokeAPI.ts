import axios from 'axios';
import { Joke, Jokes, JokesPaginate, Pagination, Sort } from '../types/jokeInterfaces';
import { parseLinkHeader } from '../utils/parseLinkHeader';

const ENDPOINT_URL = "https://retoolapi.dev/zu9TVE/jokes"

export const fetchJokes = async ({page, limit}:JokesPaginate, {sortField, sortOrder}:Sort):Promise <Jokes>=>{
    try{
        const response = await axios.get(`${ENDPOINT_URL}/?_page=${page}&_limit=${limit}&_sort=${sortField}&_order=${sortOrder}`);
        console.log(response);
        const links = response.headers.link;
        const parsedLinks:Pagination = parseLinkHeader(links)
        return {Jokes: response.data, pagination:parsedLinks };
    }catch(error){
        throw new Error('Failed to fetch Jokes.');
    }
}

export const fetchJoke = async (id: string):Promise<Joke>=>{
    try{
        const response = await axios.get(`${ENDPOINT_URL}/${id}`);
        return response.data;
    }catch(error){
        throw new Error('Failed to fetch Joke.');
    }
}

export const createJoke = async (joke: Joke):Promise<Joke>=>{
    try{
        const response = await axios.post(`${ENDPOINT_URL}`, joke);
        return response.data;
    }catch(error){
        throw new Error('Failed to add Joke.');
    }
}

export const updateJoke = async (id:string, joke: Joke):Promise<Joke>=>{
    try{
        const response = await axios.patch(`${ENDPOINT_URL}/${id}`,joke);
        return response.data;
    }catch(error){
        console.log(error)
        throw new Error('Failed to update Joke.');
    }
}

export const deleteJoke = async (id: string)=>{
    try{
        const response = await axios.patch(`${ENDPOINT_URL}/${id}`);
        return response.data;
    }catch(error){
        throw new Error('Failed to update Joke.');
    }
}

export const sortJokes =async ({sortField, sortOrder}:Sort, {page, limit}:JokesPaginate):Promise <Joke[]> => {
    try{
        const response = await axios.get(`${ENDPOINT_URL}/?_sort=${sortField}&_order=${sortOrder}&_page=${page}&_limit=${limit}`);
        return response.data;
    }catch(error){
        throw new Error('Failed to sort, try again.');
    }
}

