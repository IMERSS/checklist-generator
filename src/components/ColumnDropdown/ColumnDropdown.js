import React from 'react';

export const ColumnDropdown = ({ value, columns, onChange }) => {
  return (
    <select
      defaultValue={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
    >
      <option value=''>Please select</option>
      {columns.map((columnName, index) => (
        <option value={index} key={index}>
          {columnName} (COL{index + 1})
        </option>
      ))}
    </select>
  );
};
