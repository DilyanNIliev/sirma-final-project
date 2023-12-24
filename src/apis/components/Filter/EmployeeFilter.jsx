import React from 'react';

function EmployeeFilter({ value, options, onChange }) {
  return (
    <th>
      Employee ID{' '}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All</option>
        {options.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </th>
  );
}

export default EmployeeFilter;
