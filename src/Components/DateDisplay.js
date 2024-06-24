import React from "react";
import "./DateDisplay.css";

const DateDisplay = ({ date }) => {
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long", // long format for the day of the week (e.g., Monday)
    year: "numeric", // numeric format for the year (e.g., 2024)
    month: "long", // long format for the month (e.g., June)
    day: "numeric", // numeric format for the day (e.g., 17)
  });

  return <div className="date-display">{formattedDate}</div>;
};

export default DateDisplay;
