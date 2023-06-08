import React, { useEffect, useState } from "react";
import { Joke, initialJokeState } from "../../types/jokeInterfaces";
import { formatDate } from "../../utils/formatDate";
import { useParams } from "react-router-dom";
import { createJoke, updateJoke } from "../../api/jokeAPI";
import styles from "../../styles/components/defaults/form.module.scss";

const Form = (joke: Joke) => {
  const { id } = useParams<{ id: string }>(); //id presence determines if its a new/edited joke
  const [jokeUpdate, setJokeUpdate] = useState<Joke>(initialJokeState);

  useEffect(() => {
    setJokeUpdate(joke);
  }, [joke]);

  const handleSubmit = async () => {
    if (id) {
      updateJoke(id, jokeUpdate)
        .then((res) => {
          setJokeUpdate(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      createJoke(jokeUpdate)
        .then(() => {
          setJokeUpdate(initialJokeState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const updateJoke = { ...jokeUpdate, [key]: event.target.value };
    setJokeUpdate(updateJoke);
  };
  return (
    <form className={styles.form}>
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
      <label htmlFor="Title">
        Author
        <input
          type="text"
          placeholder="Joke Author"
          value={jokeUpdate.Author}
          onChange={(event) => handleInputChange(event, "Author")}
        />
      </label>
      <label htmlFor="Title">
        Body
        <input
          type="text"
          placeholder="Joke Body"
          value={jokeUpdate.Body}
          onChange={(event) => handleInputChange(event, "Body")}
        />
      </label>
      {id && (
        <label htmlFor="Title">
          Views
          <input type="text" readOnly value={jokeUpdate.Views} />
        </label>
      )}
      {id && (
        <label htmlFor="Title">
          Created At
          <input
            type="text"
            readOnly
            value={formatDate(jokeUpdate.CreatedAt)}
          />
        </label>
      )}

      <input type="button" value="Submit" onClick={handleSubmit} />
    </form>
  );
};

export default Form;
