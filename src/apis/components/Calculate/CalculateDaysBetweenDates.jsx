import TransformDate from '../TransformDate/TransformDate';

function calculateDaysBetweenDates(startDate, endDate) {
  const start = TransformDate(startDate);
  const end = TransformDate(endDate);

  // Convert the transformed dates back to the format 'DD-MM-YY'
  const startParts = start.split('-');
  const endParts = end.split('-');

  // Check if the original format was MM-DD-YY, then swap day and month
  const isStartMonthNumeric = parseInt(startParts[1]) <= 12;
  const isEndMonthNumeric = parseInt(endParts[1]) <= 12;

  const formattedStart = isStartMonthNumeric
    ? `${startParts[1]}-${startParts[0]}-${startParts[2]}`
    : `${startParts[0]}-${startParts[1]}-${startParts[2]}`;

  const formattedEnd = isEndMonthNumeric
    ? `${endParts[1]}-${endParts[0]}-${endParts[2]}`
    : `${endParts[0]}-${endParts[1]}-${endParts[2]}`;

  // Calculate the difference in milliseconds
  const timeDifference = new Date(formattedEnd).getTime() - new Date(formattedStart).getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Start of the week - 0 = Sunday
  const startDay = new Date(formattedStart).getDay();
  const weekends = Math.floor((daysDifference + startDay) / 7) * 2;

  // Adjust for cases where the start and end fall on the same weekend
  if (startDay + daysDifference % 7 >= 6) {
    return daysDifference - weekends + 1;
  }
  // added 1 because start and end day are the same to be displayed 1 day
  return daysDifference - weekends + 1;
}

export default calculateDaysBetweenDates;
