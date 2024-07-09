import React, { useState, useEffect, useRef } from "react";
import "./StopWatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState(() => {
    const savedLaps = localStorage.getItem("laps");
    return savedLaps ? JSON.parse(savedLaps) : [];
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem("laps", JSON.stringify(laps));
  }, [laps]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    localStorage.removeItem("laps");
  };

  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <div className="time-display">
        <span>{formatTime(time)}</span>
      </div>
      <div>
        <button className="button" onClick={handleStart}>
          Start
        </button>
        <button className="button" onClick={handleStop}>
          Stop
        </button>
        <button className="button" onClick={handleLap}>
          Lap
        </button>
        <button className="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <ul className="lap-list">
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default Stopwatch;
