import React, { ChangeEvent, useEffect, useState } from "react";
import { fetchJokes, sortJokes } from "../api/jokeAPI";
import {
  Joke,
  JokesPaginate,
  Pagination,
  Sort,
  initialPaginateState,
  initialSortState,
} from "../types/jokeInterfaces";
import { Loader, Button } from "../components";
import styles from "../styles/pages/home.module.scss";
import { formatDate } from "../utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../components/defaults/Dropdown";
import { DropdownDataType } from "../types/interfaces";

const Home = () => {
  const navigate = useNavigate();
  const [jokes, setJokes] = useState<Joke[] | null>(null);
  const [paginationData, setPaginationData] = useState<Pagination | null>(null);
  const [sortDetails, updateSortDetails] = useState<Sort>(initialSortState);
  const [currentPageLimit, setCurrentPageLimit] =
    useState<JokesPaginate>(initialPaginateState);

  const PageLimitDropdownData: DropdownDataType = [5, 10];

  useEffect(() => {
    loadJokes();
  }, [currentPageLimit]);

  const loadJokes = async () => {
    try {
      const jokesData = await fetchJokes(currentPageLimit, sortDetails);
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

  const handleSortJokes = async ({ sortField, sortOrder }: Sort) => {
    try {
      const jokesData = await sortJokes(
        { sortField, sortOrder },
        currentPageLimit
      );
      console.log(currentPageLimit);
      setJokes(jokesData);
      updateSortDetails({ sortField, sortOrder });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
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

  // const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const value = parseInt(event.target.value);
  //   updateSelection(value);
  // };

  return (
    <div className={styles.home}>
      <nav>
        <Button
          label="Add New Joke"
          handleClick={() => {
            navigate("/jokes/create");
          }}
        />
        <Dropdown
          currentSelection={currentPageLimit.limit}
          availableOptions={PageLimitDropdownData}
          handleSelectionChange={handleLimitChange}
        />
        {/* //? Dark mode toggle to be a separate component */}
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
            <th
              onClick={() => {
                handleSortJokes({ sortField: "CreatedAt", sortOrder: "asc" });
              }}
            >
              Created Date ^
            </th>
            <th
              onClick={() => {
                handleSortJokes({ sortField: "Views", sortOrder: "asc" });
              }}
            >
              Views ^
            </th>
          </tr>
        </thead>
        <tbody>
          {jokes?.map((joke) => (
            <tr key={joke.id}>
              <td>
                <Link to={`/jokes/edit/${joke.id}`}>{joke.Title}</Link>
              </td>
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
