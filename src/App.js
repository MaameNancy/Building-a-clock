import React, { useState, useEffect } from "react";
import "./App.css";
import "./Theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHourglassHalf,
  faBell,
  faGlobe,
  faStopwatch,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import Clock from "./Components/Clock";
import Timer from "./Components/Timer";
import Alarm from "./Components/Alarm";
import WorldClock from "./Components/WorldClock";
import Stopwatch from "./Components/StopWatch";
import ThemeSelector from "./Components/ThemeSelector";
import SplashScreen from "./Components/SplashScreen";

const IconBarButton = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="icon-bar-button">
    <FontAwesomeIcon icon={icon} />
    {label}
  </button>
);

const App = () => {
  const [view, setView] = useState("splash");
  const [theme, setTheme] = useState("light");
  const [customImage, setCustomImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setView("clock");
    }, 3000); // Splash screen duration: 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleThemeChange = ({ theme, image }) => {
    setTheme(theme);
    if (image) {
      setCustomImage(image);
    } else {
      setCustomImage(null);
    }
  };

  useEffect(() => {
    if (theme === "custom" && customImage) {
      document.body.style.backgroundImage = `url(${customImage})`;
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor =
        theme === "dark" ? "#333333" : "#ffffff";
    }
  }, [theme, customImage]);

  const getIconBarButtons = () => {
    return [
      {
        icon: faClock,
        label: "Clock",
        onClick: () => setView("clock"),
      },
      {
        icon: faHourglassHalf,
        label: "Timer",
        onClick: () => setView("timer"),
      },
      {
        icon: faBell,
        label: "Alarm",
        onClick: () => setView("alarm"),
      },
      {
        icon: faGlobe,
        label: "World Clock",
        onClick: () => setView("worldClock"),
      },
      {
        icon: faStopwatch,
        label: "Stopwatch",
        onClick: () => setView("stopwatch"),
      },
      {
        icon: faPalette,
        label: "Themes",
        onClick: () => setView("themeSelector"),
      },
    ];
  };

  return (
    <div className={`App ${theme}`}>
      {view === "splash" ? (
        <SplashScreen onSplashEnd={() => setView("clock")} />
      ) : (
        <>
          <header className="App-header">
            <h1>Clock</h1>
          </header>
          <div className="App-content">
            {view === "clock" && <Clock />}
            {view === "timer" && <Timer />}
            {view === "alarm" && <Alarm />}
            {view === "worldClock" && <WorldClock />}
            {view === "stopwatch" && <Stopwatch />}
            {view === "themeSelector" && (
              <ThemeSelector onChangeTheme={handleThemeChange} />
            )}
          </div>
          <div className="icon-bar">
            {getIconBarButtons().map((button, index) => (
              <IconBarButton key={index} {...button} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
