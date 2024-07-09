import React, { useState, useEffect } from "react";
import "./Clock.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [secondsColor, setSecondsColor] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const seconds = time.getSeconds();
    const hue = seconds * 6; // 0-359 degrees
    const color = `hsl(${hue}, 80%, 50%)`;
    setSecondsColor(color);
  }, [time]);

  const toggle24Hour = () => {
    setIs24Hour(!is24Hour);
  };

  const formattedTime = is24Hour
    ? time.toLocaleTimeString("en-US", { hour12: false })
    : time.toLocaleTimeString("en-US", { hour12: true });

  return (
    <div className="clock-container">
      <div className="clock-body">
        <h1 className="clock-time" style={{ color: secondsColor }}>
          {formattedTime}
        </h1>
        <div className="clock-date">{time.toLocaleDateString()}</div>
        <div className="clock-knobs">
          <div className="knob" />
          <div className="knob" />
          <button
            className="toggle-button"
            onClick={toggle24Hour}
            style={{
              backgroundColor: secondsColor,
              borderColor: secondsColor,
            }}
          >
            {is24Hour ? "12h" : "24h"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;
