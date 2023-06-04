import React, { ChangeEvent, useState } from "react";
import {
  JokesPaginate,
  initialPaginateState,
} from "../../types/jokeInterfaces";
import { DropdownData, DropdownDataType } from "../../types/interfaces";

const Dropdown = ({
  currentSelection,
  availableOptions,
  handleSelectionChange,
}: DropdownData) => {
  const [selection, updateSelection] = useState<string | number>(
    initialPaginateState.limit
  );

  return (
    <div>
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
