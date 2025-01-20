// Helper function to check if a yaer is a leap year
export const isLeapYear = (year: number) => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

// Helper function to get the maximum days in a month for a given year
export const getMaxDaysInMonth = (month: number, year: number) => {
  const daysInMonth = [
    31, // January [1]
    isLeapYear(year) ? 29 : 28, // February [2]
    31, // March [3]
    30, // April [4]
    31, // May [5]
    30, // June [6]
    31, // July [7]
    31, // August [8]
    30, // September [9]
    31, // October [10]
    30, // November [11]
    31, // December [12]
  ]
  return daysInMonth[month]
}
