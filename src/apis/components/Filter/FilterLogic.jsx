import React from 'react';
//filtering data based on employeeID, projectID, dateFrom, dateTo
function DataFilter({ data, filters, searchEmployee, searchProject, handleDateChange }) {
  const filteredData = data.filter((row) => {
    return (
      (filters.employeeID === 'all' || row[0] === filters.employeeID) &&
      (filters.projectID === 'all' || row[1] === filters.projectID) &&
      (searchEmployee.trim() === '' || row[0].includes(searchEmployee)) &&
      (searchProject.trim() === '' || row[1].includes(searchProject)) &&
      (filters.dateFrom === '' || new Date(row[2]) >= new Date(filters.dateFrom)) &&
      (filters.dateTo === '' || new Date(row[3]) <= new Date(filters.dateTo))
    );
  });
  //identyfy empty values in the fltered data and record their position
  const emptyValues = [];
  filteredData.forEach((row, rowIndex) => {
    row.slice(0, 3).forEach((value, colIndex) => {
      if (value === '') {
        emptyValues.push({ row: rowIndex + 1, column: colIndex + 1 });
      }
    });
  });

  // Display error message
  let errorMessage = '';
  if (emptyValues.length > 0) {
    errorMessage = 'Error: Empty values found in filteredData array.';
    emptyValues.forEach(({ row, column }) => {
      errorMessage +=  ` * Row ${row}, Column ${column} `;
    });
  }

  const calculateProjectId = () => {
    if (filters.projectID !== 'all') {
      return ` Project ${filters.projectID}`;
    } else if (searchProject.trim() !== '') {
      return ` Project ${searchProject.trim()}`;
    } else {
      return '';
    }
  };

  return { filteredData, emptyValues, errorMessage, calculateProjectId };
}

export default DataFilter;
