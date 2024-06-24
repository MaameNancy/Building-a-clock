import React, { useState, useEffect, useCallback } from "react";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState("");

  const addAlarm = () => {
    setAlarms([...alarms, newAlarm]);
    setNewAlarm("");
  };

  const checkAlarm = useCallback(() => {
    const now = new Date().toLocaleTimeString();
    if (alarms.includes(now)) {
      alert("Alarm!");
    }
  }, [alarms]);

  useEffect(() => {
    const interval = setInterval(checkAlarm, 1000);
    return () => clearInterval(interval);
  }, [checkAlarm]);

  return (
    <div>
      <input
        type="time"
        value={newAlarm}
        onChange={(e) => setNewAlarm(e.target.value)}
      />
      <button onClick={addAlarm}>Add Alarm</button>
      <ul>
        {alarms.map((alarm, index) => (
          <li key={index}>{alarm}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alarm;
