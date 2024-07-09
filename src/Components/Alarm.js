import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Alarm.css";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAlarm, setEditingAlarm] = useState(null);
  const [activeAlarm, setActiveAlarm] = useState(null);
  const [snoozeDuration, setSnoozeDuration] = useState(5);
  const [darkMode, setDarkMode] = useState(false);

  const ringtoneRef = useRef(new Audio("/ringtone.mp3"));

  useEffect(() => {
    const storedAlarms = localStorage.getItem("alarms");
    if (storedAlarms) {
      setAlarms(JSON.parse(storedAlarms));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    const checkAlarms = () => {
      const now = moment();
      alarms.forEach((alarm) => {
        if (
          moment(alarm.date).isSame(now, "day") &&
          moment(alarm.time, "HH:mm").isSame(now, "minute")
        ) {
          setActiveAlarm(alarm);
          ringtoneRef.current.play();
        }
      });
    };

    const interval = setInterval(checkAlarms, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [alarms]);

  const handleAddAlarm = () => {
    if (selectedDate < new Date()) {
      alert("You cannot choose a past date. Please select a future date.");
      return;
    }

    const newAlarmObject = {
      id: Math.random().toString(36).substr(2, 9),
      description: newAlarm,
      date: selectedDate,
      time: selectedTime,
    };
    setAlarms([...alarms, newAlarmObject]);
    setNewAlarm("");
    setSelectedDate(new Date());
    setSelectedTime("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAlarms = alarms.filter((alarm) => {
    return alarm.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEditAlarm = (id) => {
    setEditingAlarm(id);
  };

  const handleSaveAlarm = (id, description, date, time) => {
    if (date < new Date()) {
      alert("You cannot choose a past date. Please select a future date.");
      return;
    }

    const updatedAlarms = alarms.map((alarm) => {
      if (alarm.id === id) {
        return { ...alarm, description, date, time };
      }
      return alarm;
    });
    setAlarms(updatedAlarms);
    setEditingAlarm(null);
  };

  const handleDeleteAlarm = (id) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(updatedAlarms);
  };

  const handleSnoozeAlarm = (id) => {
    const updatedAlarms = alarms.map((alarm) => {
      if (alarm.id === id) {
        return {
          ...alarm,
          time: moment(alarm.time, "HH:mm")
            .add(snoozeDuration, "minutes")
            .format("HH:mm"),
        };
      }
      return alarm;
    });
    setAlarms(updatedAlarms);
    localStorage.setItem("alarms", JSON.stringify(updatedAlarms));
    setActiveAlarm(null);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <h1>Alarm Clock</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddAlarm();
        }}
      >
        <input
          type="text"
          value={newAlarm}
          onChange={(e) => setNewAlarm(e.target.value)}
          placeholder="Add new alarm"
          className="alarm-input"
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="alarm-input"
        />
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="alarm-input"
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search alarms"
        className="alarm-input"
      />
      <div className="alarm-list">
        {filteredAlarms.map((alarm) => (
          <div key={alarm.id} className="alarm-item">
            {editingAlarm === alarm.id ? (
              <EditAlarmForm
                alarm={alarm}
                onSave={handleSaveAlarm}
                onCancel={() => setEditingAlarm(null)}
              />
            ) : (
              <AlarmItem
                alarm={alarm}
                onDelete={handleDeleteAlarm}
                onEdit={() => handleEditAlarm(alarm.id)}
                onSnooze={() => handleSnoozeAlarm(alarm.id)}
              />
            )}
          </div>
        ))}
      </div>
      {activeAlarm && (
        <div className="active-alarm">
          <p>Alarm is ringing!</p>
          <button onClick={() => handleSnoozeAlarm(activeAlarm.id)}>
            Snooze for {snoozeDuration} minutes
          </button>
        </div>
      )}
    </div>
  );
};

const AlarmItem = ({ alarm, onDelete, onEdit, onSnooze }) => (
  <div className="alarm-details">
    <p>{alarm.description}</p>
    <p>Date: {moment(alarm.date).format("MMMM D, YYYY")}</p>
    <p>Time: {alarm.time}</p>
    <div>
      <button className="button edit-button" onClick={onEdit}>
        Edit
      </button>
      <button
        className="button delete-button"
        onClick={() => onDelete(alarm.id)}
      >
        Delete
      </button>
      <button className="button snooze-button" onClick={onSnooze}>
        Snooze
      </button>
    </div>
  </div>
);

const EditAlarmForm = ({ alarm, onSave, onCancel }) => {
  const [description, setDescription] = useState(alarm.description);
  const [date, setDate] = useState(alarm.date);
  const [time, setTime] = useState(alarm.time);

  return (
    <div className="edit-alarm-form">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={() => onSave(alarm.id, description, date, time)}>
        Save
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default Alarm;
