interface Joke{
    id: number,
    Body: string,
    Title: string,
    Views: number,
    Author: string,
    CreatedAt: number
}

interface JokesPaginate{
    page?: number,
    limit: 5 | 10, //The options valid for page content limit are 5 and 10 only
}

interface Pagination{
    first?: number,
    next?: number,
    prev?: number,
    last?: number,
}

interface Jokes{
    Jokes:Joke[],
    pagination: Pagination
}

interface JokeParams{
    id: number;
}

export {Joke, JokesPaginate, Jokes, Pagination, JokeParams};