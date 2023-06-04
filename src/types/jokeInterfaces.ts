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

type SortField ={
    CreatedAt:"CreatedAt",
    Views:"Views"
}

type SortOrder = {
    asc:"asc",
    desc:"desc"
}

interface Sort {
    sortField?: keyof SortField,
    sortOrder?: keyof SortOrder
}

const initialSortState: Sort = {}

const initialJokeState: Joke = {
    id: 0,
    Body: "",
    Title: "",
    Views: 0,
    Author: "",
    CreatedAt: Date.now(),
  };

const initialPaginateState: JokesPaginate = {
    page: 1,
    limit: 5,
  };

export {Joke, JokesPaginate, Jokes, Pagination, Sort, SortField, SortOrder, initialSortState, initialJokeState, initialPaginateState};