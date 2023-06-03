import React, { useEffect, useState } from "react";
import { fetchJokes } from "../api/jokeAPI";
import { Joke, JokesPaginate, Pagination } from "../types/jokeInterfaces";
import { Loader, Button } from "../components";
import styles from "../styles/pages/home.module.scss";
import { formatDate } from "../utils/formatDate";

const Home = () => {
  const [jokes, setJokes] = useState<Joke[] | null>(null);
  const [paginationData, setPaginationData] = useState<Pagination | null>(null);
  const initialPaginateState: JokesPaginate = {
    page: 1,
    limit: 5,
  };
  const [currentPageLimit, setCurrentPageLimit] =
    useState<JokesPaginate>(initialPaginateState);

  useEffect(() => {
    loadJokes();
  }, [currentPageLimit]);

  const loadJokes = async () => {
    try {
      const jokesData = await fetchJokes(currentPageLimit);
      console.log(jokes);
      setJokes(jokesData.Jokes);
      setPaginationData(jokesData.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  const prevPage = () => {
    setCurrentPageLimit({
      page: paginationData?.prev,
      limit: currentPageLimit.limit,
    });
  };

  const nextPage = () => {
    setCurrentPageLimit({
      page: paginationData?.next,
      limit: currentPageLimit.limit,
    });
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedOption(event.target.value);
    const value = parseInt(event.target.value);
    setCurrentPageLimit({
      page: currentPageLimit.page,
      limit: value === 5 || value === 10 ? value : currentPageLimit.limit,
    });
  };

  const colorPicker = (value: number): string => {
    // 0<TOMATO>25, 26<ORANGE>50, 51<YELLOW>75, 76<GREEN>100
    if (value >= 76 && value <= 100) {
      return "green";
    } else if (value >= 51 && value <= 75) {
      return "yellow";
    } else if (value >= 26 && value <= 50) {
      return "orange";
    } else {
      return "tomato";
    }
  };

  return (
    <div className={styles.home}>
      <nav>
        <Button
          label="Add New Joke"
          handleClick={() => {
            // ?redirect to joke page
          }}
        />
        <div className={styles.page_size}>
          <div className={styles.page_size_option}>
            <label htmlFor="page-size">
              <input
                defaultChecked={currentPageLimit.limit == 5}
                type="radio"
                value={5}
                id="limit-five"
                name="page-size"
                onChange={handleLimitChange}
              />
              5
            </label>
            <label htmlFor="limit_ten">
              <input
                defaultChecked={currentPageLimit.limit == 10}
                type="radio"
                value={10}
                id="limit-ten"
                name="page-size"
                onChange={handleLimitChange}
              />
              10
            </label>
          </div>
        </div>
        <div>
          <input type="checkbox" id="dark-mode" />{" "}
          <label htmlFor="dark-mode">Dark</label>
        </div>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created Date</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {jokes?.map((joke) => (
            <tr key={joke.id}>
              <td>{joke.Title}</td>
              <td>{joke.Author.replace(/@.*\./, "@***.")}</td>
              <td>{formatDate(joke.CreatedAt)}</td>
              <td style={{ color: colorPicker(joke.Views) }}>{joke.Views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!jokes && <Loader />}
      <div>
        <Button
          label={"< Previous"}
          handleClick={prevPage}
          disabled={currentPageLimit.page === paginationData?.first}
        />
        <Button
          label={"Next >"}
          handleClick={nextPage}
          disabled={currentPageLimit.page === paginationData?.last}
        />
      </div>
    </div>
  );
};

export default Home;
