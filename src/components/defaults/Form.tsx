import React, { useEffect, useState } from "react";
import { Joke, initialJokeState } from "../../types/jokeInterfaces";
import { formatDate } from "../../utils/formatDate";
import { useParams } from "react-router-dom";
import { createJoke, updateJoke } from "../../api/jokeAPI";

const Form = (joke: Joke) => {
  const { id } = useParams<{ id: string }>(); //id presence determines if its a new/edited joke
  const [jokeUpdate, setJokeUpdate] = useState<Joke>(initialJokeState);

  useEffect(() => {
    setJokeUpdate(joke);
  }, [joke]);

  const handleSubmit = async () => {
    console.log(jokeUpdate);
    if (id) {
      const jokeData = await updateJoke(id, jokeUpdate);
      console.log(jokeData);
    } else {
      const jokeData = await createJoke(jokeUpdate);
      console.log(jokeData);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    console.log(event.target.value);
    console.log(key);
    const updateJoke = { ...jokeUpdate, [key]: event.target.value };
    setJokeUpdate(updateJoke);
  };
  return (
    <form>
      <label htmlFor="Title">
        Title
        <input
          type="text"
          name="Title"
          value={jokeUpdate.Title}
          placeholder="Joke Title"
          onChange={(event) => handleInputChange(event, "Title")}
        />
      </label>
      <input
        type="text"
        placeholder="Joke Author"
        value={jokeUpdate.Author}
        onChange={(event) => handleInputChange(event, "Author")}
      />
      <input
        type="text"
        placeholder="Joke Body"
        value={jokeUpdate.Body}
        onChange={(event) => handleInputChange(event, "Body")}
      />
      {id && <input type="text" readOnly value={jokeUpdate.Views} />}
      {id && (
        <input type="text" readOnly value={formatDate(jokeUpdate.CreatedAt)} />
      )}

      <input type="button" value="Submit" onClick={handleSubmit} />
    </form>
  );
};

export default Form;
