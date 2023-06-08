import React from "react";
import { useTheme } from "../../context/themeContext";

const Darkmode = () => {
  const { themeMode, toggleThemeMode } = useTheme();
  return (
    <div>
      <input
        checked={themeMode == "dark"}
        type="checkbox"
        id="dark-mode"
        onChange={toggleThemeMode}
      />{" "}
      <label htmlFor="dark-mode">Dark</label>
    </div>
  );
};

export default Darkmode;
