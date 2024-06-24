// src/components/Timer.js
import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  const handleStart = () => {
    if (!running && timeLeft > 0) {
      setRunning(true);
    }
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setTimeLeft(0);
  };

  useEffect(() => {
    if (running && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setRunning(false);
    }
  }, [running, timeLeft]);

  return (
    <div>
      <input
        type="number"
        value={timeLeft}
        onChange={(e) => setTimeLeft(Number(e.target.value))}
        disabled={running}
      />
      <button onClick={handleStart} disabled={running}>
        Start
      </button>
      <button onClick={handleStop} disabled={!running}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
      <div className="flip-clock">
        {Math.floor(timeLeft / 60)}:{timeLeft % 60}
      </div>
    </div>
  );
};

export default Timer;
