const getTopEmployees = (filteredData, calculateDaysForRow) => {
  const employeeDaysMap = {};

  filteredData.forEach((row) => {
    const employeeID = row[0];
    const days = calculateDaysForRow(row);

    if (!employeeDaysMap[employeeID]) {
      employeeDaysMap[employeeID] = 0;
    }

    employeeDaysMap[employeeID] += days;
  });

  // Convert the map to an array of objects for sorting
  const employeeDaysArray = Object.entries(employeeDaysMap).map(([id, days]) => ({
    id,
    days,
  }));

  // Sort the array in descending order based on days worked
  employeeDaysArray.sort((a, b) => b.days - a.days);

  // Return the top 2 employees
  return employeeDaysArray.slice(0, 2);
};

function TopEmployees({ filteredData, calculateDaysForRow, projectId }) {
  // Call the getTopEmployees function
  const topEmployees = getTopEmployees(filteredData, calculateDaysForRow);

  const totalDaysFirstEmployee = topEmployees.length > 0 ? topEmployees[0].days : 0;
  const totalDaysSecondEmployee = topEmployees.length > 1 ? topEmployees[1].days : 0;

  const combinedTotalDays = totalDaysFirstEmployee + totalDaysSecondEmployee;
  return (
    <div className="topEmployee">
      {topEmployees.length > 0 ? (
        <>
          <h2>The Employees with Most Days on {projectId}:</h2>
          <ul>
            {topEmployees.map((employee) => (
              <li key={employee.id}>
                Employee ID: {employee.id}, Days Worked: {employee.days}
              </li>
            ))}
            <li>Combined Total Days for Top 2 Employees: {combinedTotalDays}</li>
          </ul>
        </>
      ) : (
        <h2>No employees found for {projectId}.</h2>
      )}
    </div>
  );
}

export default TopEmployees;