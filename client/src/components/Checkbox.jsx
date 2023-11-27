import React from "react";

export const Checkbox = ({ name, label, checked, onChange }) => {
  return (
    <div className="checkbox-input">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
