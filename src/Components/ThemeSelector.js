import React from "react";
import "./ThemeSelector.css";

const ThemeSelector = ({ setTheme }) => {
  return (
    <div className="theme-selector">
      <button onClick={() => setTheme("default")}>Default Theme</button>
      <button onClick={() => setTheme("dark-theme")}>Dark Theme</button>
      <button onClick={() => setTheme("light-theme")}>Light Theme</button>
      <button onClick={() => setTheme("blue-theme")}>Blue Theme</button>
      <button onClick={() => setTheme("green-theme")}>Green Theme</button>
      <button onClick={() => setTheme("red-theme")}>Red Theme</button>
    </div>
  );
};

export default ThemeSelector;
