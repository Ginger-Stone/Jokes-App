import React, { useState } from "react";
import { Joke, initialJokeState } from "../../types/jokeInterfaces";
import Form from "../../components/defaults/Form";

const Create = () => {
  const [joke, setJoke] = useState<Joke>(initialJokeState);
  return (
    <div>
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

export default Create;
