import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { fetchJokes, sortJokes } from "../api/jokeAPI";
import {
  Joke,
  Pagination,
  Sort,
  initialSortState,
} from "../types/jokeInterfaces";
import { Loader, Button } from "../components";
import styles from "../styles/pages/home.module.scss";
import { formatDate } from "../utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/defaults/Navbar";
import { CurrentPageLimitContext } from "../context/currentPageLimitContext";
import { useTheme } from "../context/themeContext";

const Home = () => {
  const { theme } = useTheme();
  const [jokes, setJokes] = useState<Joke[] | null>(null);
  const [paginationData, setPaginationData] = useState<Pagination | null>(null);
  const [sortDetails, updateSortDetails] = useState<Sort>(initialSortState);
  const { currentPageLimit, UpdatePageLimit } = useContext(
    CurrentPageLimitContext
  );

  useEffect(() => {
    loadJokes();
  }, [currentPageLimit]);

  const loadJokes = async () => {
    try {
      const jokesData = await fetchJokes(currentPageLimit, sortDetails);
      setJokes(jokesData.Jokes);
      setPaginationData(jokesData.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  const prevPage = () => {
    UpdatePageLimit?.({
      page: paginationData?.prev,
      limit: currentPageLimit.limit,
    });
  };

  const nextPage = () => {
    UpdatePageLimit?.({
      page: paginationData?.next,
      limit: currentPageLimit.limit,
    });
  };

  const handleSortJokes = async ({ sortField, sortOrder }: Sort) => {
    try {
      const jokesData = await sortJokes(
        { sortField, sortOrder },
        currentPageLimit
      );
      setJokes(jokesData);
      updateSortDetails({ sortField, sortOrder });
    } catch (error) {
      console.log(error);
    }
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
      <Navbar />
      <div className={styles.table}>
        <div className={styles.header}>Title</div>
        <div className={styles.header}>Author</div>
        <div
          className={styles.header}
          onClick={() =>
            handleSortJokes({
              sortField: "CreatedAt",
              sortOrder: `${
                sortDetails.sortField == "CreatedAt" &&
                sortDetails.sortOrder == "asc"
                  ? "desc"
                  : "asc"
              }`,
            })
          }
        >
          Created Date{" "}
          <span
            className={
              sortDetails.sortField == "CreatedAt"
                ? sortDetails.sortOrder == "asc"
                  ? styles.sort_arrow_asc
                  : styles.sort_arrow_desc
                : styles.sort_arrow_inactive
            }
          >
            ^
          </span>
        </div>
        <div
          className={styles.header}
          onClick={() =>
            handleSortJokes({
              sortField: "Views",
              sortOrder: `${
                sortDetails.sortField == "Views" &&
                sortDetails.sortOrder == "asc"
                  ? "desc"
                  : "asc"
              }`,
            })
          }
        >
          Views{" "}
          <span
            className={
              sortDetails.sortField == "Views"
                ? sortDetails.sortOrder == "asc"
                  ? styles.sort_arrow_asc
                  : styles.sort_arrow_desc
                : styles.sort_arrow_inactive
            }
          >
            ^
          </span>
        </div>

        {jokes?.map((joke) => (
          <React.Fragment key={joke.id}>
            <div>
              <Link to={`/jokes/edit/${joke.id}`}>{joke.Title}</Link>
            </div>
            <div>{joke?.Author?.replace(/@.*\./, "@***.")}</div>
            <div>{formatDate(joke.CreatedAt)}</div>
            <div style={{ color: colorPicker(joke.Views) }}>{joke.Views}</div>
          </React.Fragment>
        ))}
      </div>

      {!jokes && <Loader />}
      <div className={styles.pagination}>
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
