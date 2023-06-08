import React, { ChangeEvent, useState } from "react";
import {
  JokesPaginate,
  initialPaginateState,
} from "../../types/jokeInterfaces";
import { DropdownData, DropdownDataType } from "../../types/interfaces";
import styles from "../../styles/components/defaults/dropdown.module.scss";

const Dropdown = ({
  currentSelection,
  availableOptions,
  handleSelectionChange,
}: DropdownData) => {
  return (
    <div className={styles.dropdown}>
      <label htmlFor="page-limit">Page limit:</label>

      <select
        name="page-limit"
        id="page-limit"
        value={currentSelection}
        onChange={handleSelectionChange}
      >
        {availableOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
