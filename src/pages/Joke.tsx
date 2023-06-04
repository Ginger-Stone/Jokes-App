import React, { useEffect, useState } from "react";
import { fetchJoke } from "../api/jokeAPI";
import { useParams } from "react-router-dom";
import { Joke } from "../types/jokeInterfaces";
import { formatDate } from "../utils/formatDate";

const Joke = () => {
  const { id } = useParams<{ id: string }>();
  const initialJokeState: Joke = {
    id: -1,
    Body: "",
    Title: "",
    Views: -1,
    Author: "",
    CreatedAt: -1,
  };
  const [joke, setJoke] = useState<Joke>(initialJokeState);
  useEffect(() => {
    console.log(id);
    loadJoke();
  }, []);

  const loadJoke = async () => {
    try {
      if (id) {
        const jokeData = await fetchJoke(id);
        console.log(jokeData);
        setJoke(jokeData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const updateJoke = { ...joke, key: event.target.value };
    setJoke(updateJoke);
  };
  const handleSubmit = () => {
    console.log(joke);
  };
  return (
    <div>
      {/* //? Add buttons DELETE & CLOSE  */}
      <form action="">
        <input
          type="text"
          value={joke.Title}
          onChange={(event) => {
            const updateJoke = { ...joke, Title: event.target.value };
            setJoke(updateJoke);
          }}
        />
        <input
          type="text"
          value={joke.Author}
          onChange={(event) => {
            const updateJoke = { ...joke, Title: event.target.value };
            setJoke(updateJoke);
          }}
        />
        <input
          type="text"
          value={joke.Body}
          onChange={(event) => {
            const updateJoke = { ...joke, Title: event.target.value };
            setJoke(updateJoke);
          }}
        />
        {joke.Views !== -1 && <input type="text" readOnly value={joke.Views} />}
        {joke.CreatedAt !== -1 && (
          <input type="text" readOnly value={formatDate(joke.CreatedAt)} />
        )}

        <input type="button" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Joke;
