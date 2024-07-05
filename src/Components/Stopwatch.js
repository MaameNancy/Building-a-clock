import React, { useState, useRef } from "react";
import "./StopWatch.css"; // Corrected import statement to match the file name

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef();

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const lapStopwatch = () => {
    if (!isRunning) return;
    const newLapTime = time;
    setLaps([...laps, newLapTime]);
  };

  const formatTime = (time) => {
    // Format time in hours, minutes, seconds, and milliseconds
    const hours = Math.floor(time / (60 * 60 * 100));
    const minutes = Math.floor((time / (60 * 100)) % 60);
    const seconds = Math.floor((time / 100) % 60);
    const milliseconds = Math.floor(time % 100);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch">
      <div className="display">{formatTime(time)}</div>
      <div className="controls">
        <button className="control-btn" onClick={startStopwatch}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="control-btn" onClick={lapStopwatch}>
          Lap
        </button>
        <button className="control-btn" onClick={resetStopwatch}>
          Reset
        </button>
      </div>
      <div className="laps">
        <h4>Laps:</h4>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
