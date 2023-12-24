import React from 'react';

function ProjectFilter({ value, options, onChange }) {
  return (
    <th>
      ProjectId ID{' '}
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

export default ProjectFilter;
