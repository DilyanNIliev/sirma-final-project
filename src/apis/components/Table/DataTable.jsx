import React, { useState, useEffect, useRef } from 'react';
import TopEmployees from '../TopTwoEmployees/TopEmployees.jsx'
import Table from '../CreateTable/CreatingTable.jsx'
import TransformDate from '../TransformDate/TransformDate.jsx';
import calculateDaysBetweenDates from '../Calculate/CalculateDaysBetweenDates.jsx'; 
import SearchBar from '../Search/SearchBar.jsx'
import SearchBarDate from '../Search/SearchBarDates.jsx';
import DataFilter from '../Filter/FilterLogic.jsx';


function Datatable({ data }) {
  const [filters, setFilters] = useState({
    employeeID: 'all',
    projectID: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const [uniqueEmployeeIDs, setUniqueEmployeeIDs] = useState([]);
  const [uniqueProjectIDs, setUniqueProjectIDs] = useState([]);

  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchProject, setSearchProject] = useState('');
  const errorRef = useRef(null);


  useEffect(() => {
    // Extract unique values for each column
    const getUniqueValues = (columnIndex) => {
      return [...new Set(data.map((row) => row[columnIndex]))];
    };

    setUniqueEmployeeIDs(getUniqueValues(0));
    setUniqueProjectIDs(getUniqueValues(1));
  }, [data]);

  const handleFilterChange = (columnName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnName]: value,
    }));
  };

  const handleSearchEmployee = (e) => {
    setSearchEmployee(e.target.value);
  };

  const handleSearchProject = (e) => {
    setSearchProject(e.target.value);
  };

  const handleDateChange = (dateFieldName, dateValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [dateFieldName]: dateValue,
    }));
  };
  

  // Helper function to calculate days for each row
  const calculateDaysForRow = (row) => {
    const startDate = row[2]; // Assuming dateFrom is at index 2
    const endDate = row[3]; // Assuming dateTo is at index 3
    return calculateDaysBetweenDates(startDate, endDate);
  };

  const { filteredData, errorMessage, calculateProjectId } = DataFilter({
    data,
    filters,
    searchEmployee,
    searchProject,
    handleDateChange,
  });

  const projectId = calculateProjectId(calculateDaysForRow);

  return (
    <div className='content'>
      <div className='searching-fields'>
      <SearchBar
        value={searchEmployee}
        onChange={handleSearchEmployee}
        placeholder="Enter employee ID"
        label="Search Employee"
      />
      <SearchBar
        value={searchProject}
        onChange={handleSearchProject}
        placeholder="Enter Project ID"
        label="Search Project"
      />
      <SearchBarDate
        value={filters.dateFrom}
        onChange={(e) => handleDateChange('dateFrom', e.target.value)}
        label="Date From"
        locale="fr-CA"
      />
      <SearchBarDate
        value={filters.dateTo}
        onChange={(e) => handleDateChange('dateTo', e.target.value)}
        label="Date To"
      />
      </div>
      {/* Display the calculated days if available */}
      <Table
        data={data}
        filteredData={filteredData}
        TransformDate={TransformDate}
        uniqueEmployeeIDs={uniqueEmployeeIDs}
        uniqueProjectIDs={uniqueProjectIDs}
        filters={filters}
        handleFilterChange={handleFilterChange}
        calculateDaysForRow ={calculateDaysForRow }
      />
      {errorMessage && (
  <div ref={errorRef} className='error'>
    {errorMessage} <button onClick={() => (errorRef.current.style.display = 'none')} className='error'>Close</button>
  </div>
)}
          {/* Display TopEmployees when project is selected or when searching */}
    {(filters.projectID !== 'all' || (searchProject && searchProject.trim() !== 'all')) && (
       <TopEmployees
       filteredData={filteredData}
       calculateDaysForRow={calculateDaysForRow}
       projectId={projectId}
     />
    )}
    </div>
  );
}


export default Datatable;