import React, { useEffect, useState } from "react";
import { fetchJoke } from "../../api/jokeAPI";
import { useParams } from "react-router-dom";
import { Joke, initialJokeState } from "../../types/jokeInterfaces";
import { formatDate } from "../../utils/formatDate";
import Form from "../../components/defaults/Form";

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const [joke, setJoke] = useState<Joke>(initialJokeState);
  useEffect(() => {
    loadJoke();
  }, []);

  const loadJoke = async () => {
    try {
      if (id) {
        const jokeData = await fetchJoke(id);
        setJoke(jokeData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* //? Add buttons DELETE & CLOSE- as component to be shared with Create */}
      <Form
        id={joke.id}
        Body={joke.Body}
        Title={joke.Title}
        Views={joke.Views}
        Author={joke.Author}
        CreatedAt={joke.CreatedAt}
      />
    </div>
  );
};

export default Edit;
