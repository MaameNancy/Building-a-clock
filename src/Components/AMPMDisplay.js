import React from "react";
import "./AMPMDisplay.css";

const AMPMDisplay = ({ hours }) => {
  const isPM = hours >= 12;
  const period = isPM ? "PM" : "AM";

  return <div className="ampm-display">{period}</div>;
};

export default AMPMDisplay;
