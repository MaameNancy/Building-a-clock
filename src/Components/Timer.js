import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [running, time]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <div className="timer">
      <h1 className="timer-display">{formatTime(time)}</h1>
      <div className="button-group">
        <button className="button" onClick={handleStart}>
          Start
        </button>
        <button className="button" onClick={handleStop}>
          Stop
        </button>
        <button className="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default Timer;
