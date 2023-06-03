import { Pagination } from "../types/jokeInterfaces";

export function parseLinkHeader(linkHeader: string):Pagination{
const pattern = /<([^>]+)>;\s*rel="([^"]+)"/g;

// Create an object to store the parsed links
const links: { [key: string]: string } = {};

// Match the links using the regular expression
let match;
while ((match = pattern.exec(linkHeader))) {
  const url = match[1];
  const rel = match[2];
  links[rel] = url;
}

type Paginate = {
  [key: string]: number;
};
let pageNumbersObject:Paginate = {};

const parsedLinks = {
    first:links['first'],
    next:links['next'],
    prev:links['prev'],
    last:links['last'],
}

Object.entries(parsedLinks).forEach(([key, value]) => {
  const regex = /_page=(\d+)/;
  const match = value?.match(regex);
  if (match) {
    pageNumbersObject[key] = parseInt(match[1]);
  }
});

console.log(pageNumbersObject)

return pageNumbersObject
}