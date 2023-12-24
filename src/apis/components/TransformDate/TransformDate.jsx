const TransformDate = (dateString, fieldName) => {
  if (!dateString) {
    // If date is null and fieldName is not 'dateFrom', consider it as today
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString().slice(2); // Get the last two digits of the year

    return `${day}-${month}-${year}`;
  }

  // Replace '.' and '/' with '-'
  dateString = dateString.replace(/[.\/]/g, '-');

  const parts = dateString.split('-');
  let day, month, year;

  // Check if the day part is greater than 12, indicating MM-DD-YY format
  if (parseInt(parts[0]) > 12) {
    // In MM-DD-YY format
    day = parts[1].toString().padStart(2, '0');
    month = parts[0].toString().padStart(2, '0');
    year = parts[2].slice(-2);
  } 
    // In DD-MM-YY format
    // Check if the month part is a name
    const monthNames = [
      { short: 'jan', full: 'january' },
      { short: 'feb', full: 'february' },
      { short: 'mar', full: 'march' },
      { short: 'apr', full: 'april' },
      { short: 'may', full: 'may' },
      { short: 'jun', full: 'june' },
      { short: 'jul', full: 'july' },
      { short: 'aug', full: 'august' },
      { short: 'sep', full: 'september' },
      { short: 'oct', full: 'october' },
      { short: 'nov', full: 'november' },
      { short: 'dec', full: 'december' },
    ];

    // Check if the month part is a name
    const monthIndex = monthNames.findIndex(
      nameObj =>
        nameObj.short.toLowerCase() === parts[1].toLowerCase() ||
        nameObj.full.toLowerCase() === parts[1].toLowerCase()
    );

    if (monthIndex !== -1) {
      month = (monthIndex + 1).toString().padStart(2, '0');
    } else {
      month = parts[1].toString().padStart(2, '0');
    }

    day = parts[0].toString().padStart(2, '0');
    year = parts[2].slice(-2);
  

  return `${day}-${month}-${year}`;
};

export default TransformDate;
