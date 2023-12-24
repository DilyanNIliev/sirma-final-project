import React from 'react';
import EmployeeFilter from '../Filter/EmployeeFilter.jsx';
import ProjectFilter from '../Filter/ProjectFilter.jsx';
import { useState } from 'react';

function Table({ calculateDaysForRow, filteredData, TransformDate, uniqueEmployeeIDs, uniqueProjectIDs, filters, handleFilterChange }) {
  const [visibleRows, setVisibleRows] = useState(10);

  const handleLoadMore = () => {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 5);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <EmployeeFilter
              value={filters.employeeID}
              options={[...uniqueEmployeeIDs]}
              onChange={(value) => handleFilterChange('employeeID', value)}
            />
            <ProjectFilter
              value={filters.projectID}
              options={[...uniqueProjectIDs]}
              onChange={(value) => handleFilterChange('projectID', value)}
            />
            <th>Date From</th>
            <th>Date To</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, visibleRows).map((row, index) => (
            <tr key={index}>
              <td className={row[0] === '' ? 'empty-td' : ''}>{row[0]}</td>
              <td className={row[1] === '' ? 'empty-td' : ''}>{row[1]}</td>
              <td className={row[2] === '' ? 'empty-td' : ''}>
                {row[2] !== '' ? TransformDate(row[2]) : ''}
              </td>
              <td>{TransformDate(row[3])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleRows < filteredData.length && (
        <button onClick={handleLoadMore}>Load 5 More</button>
      )}
    </div>
  );
}

export default Table;
