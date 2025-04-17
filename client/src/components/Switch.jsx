import React from "react";

const Switch = ({ onToggle }) => {
  return (
    <div className="toggle-wrapper">
      <input type="checkbox" id="toggle" onChange={onToggle} />
      <label htmlFor="toggle" />
    </div>
  );
};

export default Switch;
