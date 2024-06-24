import React, { useState, useEffect } from "react";
import "./Clock.css";
import DateDisplay from "./DateDisplay";
import AMPMDisplay from "./AMPMDisplay";

const FlipCard = ({ value, previousValue, label }) => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== previousValue) {
      setFlip(true);
      const timeoutId = setTimeout(() => setFlip(false), 600); // Duration of the flip animation
      return () => clearTimeout(timeoutId);
    }
  }, [value, previousValue]);

  return (
    <div className="flip-card-container">
      <div className="flip-card">
        <div className={`flip-card-inner ${flip ? "flip" : ""}`}>
          <div className="flip-card-front">{value}</div>
          <div className="flip-card-back">{previousValue}</div>
        </div>
      </div>
      <div className="label">{label}</div>
    </div>
  );
};

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [previousTime, setPreviousTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPreviousTime(time);
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  const formatTime = (date) => {
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const {
    hours: currentHours,
    minutes: currentMinutes,
    seconds: currentSeconds,
  } = formatTime(time);
  const {
    hours: previousHours,
    minutes: previousMinutes,
    seconds: previousSeconds,
  } = formatTime(previousTime);

  return (
    <div>
      <DateDisplay date={time} />
      <div className="flip-clock">
        <FlipCard
          value={currentHours}
          previousValue={previousHours}
          label="Hrs"
        />
        <FlipCard
          value={currentMinutes}
          previousValue={previousMinutes}
          label="Mins"
        />
        <FlipCard
          value={currentSeconds}
          previousValue={previousSeconds}
          label="Secs"
        />
      </div>
      <AMPMDisplay hours={time.getHours()} />
    </div>
  );
};

export default Clock;
