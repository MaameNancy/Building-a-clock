import React, { useState, useEffect } from "react";
import Clock from "./Components/Clock";
import Timer from "./Components/Timer";
import Alarm from "./Components/Alarm";
import WorldClock from "./Components/WorldClock";
import Stopwatch from "./Components/Stopwatch";
import ThemeSelector from "./Components/ThemeSelector";
import "./App.css";
import "./Dropdown.css";
import "./Theme.css"; // Import the themes CSS

const App = () => {
  const [view, setView] = useState("clock");
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const renderView = () => {
    switch (view) {
      case "clock":
        return <Clock />;
      case "timer":
        return <Timer />;
      case "alarm":
        return <Alarm />;
      case "worldClock":
        return <WorldClock />;
      case "stopwatch":
        return <Stopwatch />;
      case "themeSelector":
        return <ThemeSelector setTheme={setTheme} />;
      default:
        return <Clock />;
    }
  };

  return (
    <div className="App">
      <Dropdown setView={setView} />
      {renderView()}
    </div>
  );
};

const Dropdown = ({ setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        Menu
      </button>
      <ul
        className={`dropdown-menu ${isOpen ? "show" : ""}`}
        aria-labelledby="dropdownMenuButton"
      >
        <li>
          <button className="dropdown-item" onClick={() => setView("clock")}>
            Clock
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => setView("timer")}>
            Timer
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => setView("alarm")}>
            Alarm
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => setView("worldClock")}
          >
            World Clock
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => setView("stopwatch")}
          >
            Stopwatch
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => setView("themeSelector")}
          >
            Theme Selector
          </button>
        </li>
      </ul>
    </div>
  );
};

export default App;
