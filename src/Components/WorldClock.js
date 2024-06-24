// src/components/WorldClock.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const WorldClock = () => {
  const [time, setTime] = useState(null);
  const [timezone, setTimezone] = useState("Europe/London");

  useEffect(() => {
    axios
      .get(`http://worldtimeapi.org/api/timezone/${timezone}`)
      .then((response) => {
        setTime(response.data.datetime);
      });
  }, [timezone]);

  return (
    <div>
      <select onChange={(e) => setTimezone(e.target.value)}>
        <option value="Europe/London">London</option>
        <option value="America/New_York">New York</option>
        <option value="Asia/Tokyo">Tokyo</option>
      </select>
      <div className="flip-clock">
        {time ? new Date(time).toLocaleTimeString() : "Loading..."}
      </div>
    </div>
  );
};

export default WorldClock;
