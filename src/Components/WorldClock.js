import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./WorldClock.css";

const WorldClock = () => {
  const [timeZones, setTimeZones] = useState([]);
  const [selectedTimeZones, setSelectedTimeZones] = useState([]);
  const [currentTime, setCurrentTime] = useState({});
  const [offsets, setOffsets] = useState({});
  const [dayNight, setDayNight] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const zones = moment.tz.names();
    setTimeZones(zones);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeObj = {};
      const offsetsObj = {};
      const dayNightObj = {};
      selectedTimeZones.forEach((zone) => {
        const currentTime = moment.tz(zone).format("HH:mm:ss");
        const offset = moment.tz(zone).utcOffset() / 60;
        const isDay =
          moment.tz(zone).hour() >= 6 && moment.tz(zone).hour() < 18;
        currentTimeObj[zone] = currentTime;
        offsetsObj[zone] = offset;
        dayNightObj[zone] = isDay ? "day" : "night";
      });
      setCurrentTime(currentTimeObj);
      setOffsets(offsetsObj);
      setDayNight(dayNightObj);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimeZones]);

  const handleTimeZoneSelect = (zone) => {
    if (!selectedTimeZones.includes(zone)) {
      setSelectedTimeZones([...selectedTimeZones, zone]);
    }
  };

  const handleTimeZoneRemove = (zone) => {
    setSelectedTimeZones(selectedTimeZones.filter((z) => z !== zone));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTimeZones = timeZones.filter((zone) =>
    zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="world-clock">
      <h2>World Clock</h2>
      <input
        type="search"
        placeholder="Search Timezones"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <ul className="timezone-dropdown">
          {filteredTimeZones.map((zone) => (
            <li key={zone} onClick={() => handleTimeZoneSelect(zone)}>
              {zone}
            </li>
          ))}
        </ul>
      )}
      <ul>
        {selectedTimeZones.map((zone) => (
          <li key={zone} className="timezone-card">
            <span className="timezone-name">{zone}</span>
            <span className="timezone-time">{currentTime[zone]}</span>
            <span className="timezone-offset">
              {offsets[zone] > 0
                ? `+${offsets[zone]} hours`
                : `${offsets[zone]} hours`}
            </span>
            <span className={`timezone-day-night ${dayNight[zone]}`}>
              {dayNight[zone] === "day" ? "🌞" : "🌜"}
            </span>
            <button onClick={() => handleTimeZoneRemove(zone)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorldClock;
