import axios from 'axios';
import { Joke, JokeParams, Jokes, JokesPaginate, Pagination } from '../types/jokeInterfaces';
import { parseLinkHeader } from '../utils/parseLinkHeader';

const ENDPOINT_URL = "https://retoolapi.dev/zu9TVE/jokes"

export const fetchJokes = async ({page, limit}:JokesPaginate):Promise <Jokes>=>{
    try{
        const response = await axios.get(`${ENDPOINT_URL}/?_page=${page}&_limit=${limit}`);
        console.log(response);
        const links = response.headers.link;
        console.log(links)
        const parsedLinks:Pagination = parseLinkHeader(links)
        console.log(parsedLinks)
        // console.log(parsedLinks);
        // const first = link
        return {Jokes: response.data, pagination:parsedLinks };
        // return {Jokes: response.data };
    }catch(error){
        // console.log(error)
        throw new Error('Failed to fetch Jokes.');
    }
}

export const fetchJoke = async ({id}: JokeParams)=>{
    try{
        const response = await axios.get(`${ENDPOINT_URL}/${id}`);
        return response.data;
    }catch(error){
        throw new Error('Failed to fetch Joke.');
    }
}

export const createJoke = async (joke: Joke)=>{
    try{
        const response = await axios.post(`${ENDPOINT_URL}, ${joke}`);
        return response.data;
    }catch(error){
        throw new Error('Failed to add Joke.');
    }
}

export const updateJoke = async (joke: Joke)=>{
    try{
        const response = await axios.patch(`${ENDPOINT_URL}, ${joke}`);
        return response.data;
    }catch(error){
        throw new Error('Failed to update Joke.');
    }
}

export const deleteJoke = async ({id}: JokeParams)=>{
    try{
        const response = await axios.patch(`${ENDPOINT_URL}/${id}`);
        return response.data;
    }catch(error){
        throw new Error('Failed to update Joke.');
    }
}