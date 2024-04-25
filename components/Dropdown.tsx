"use client";
import React from "react";

interface Option {
  id: string;
  name: string;
}

interface DropdownProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label>{label}:</label>
      <select value={value} onChange={onChange}>
        <option value="">{`Pilih ${label}`}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
