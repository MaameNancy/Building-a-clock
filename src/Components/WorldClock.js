import React, { useState, useEffect } from "react";

function WorldClock() {
  const [timeZones, setTimeZones] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => setTimeZones(data));
  }, []);

  const handleTimeZoneChange = (e) => {
    setSelectedTimeZone(e.target.value);
  };

  const currentTime = () => {
    if (selectedTimeZone) {
      fetch(`https://worldtimeapi.org/api/timezone/${selectedTimeZone}`)
        .then((response) => response.json())
        .then((data) => console.log(data.current_time));
    }
  };

  return (
    <div className="world-clock-container">
      <h1>World Clock</h1>
      <select value={selectedTimeZone} onChange={handleTimeZoneChange}>
        <option value="">Select a time zone</option>
        {timeZones.map((timeZone) => (
          <option key={timeZone} value={timeZone}>
            {timeZone}
          </option>
        ))}
      </select>
      <button onClick={currentTime}>Get current time</button>
    </div>
  );
}

export default WorldClock;
