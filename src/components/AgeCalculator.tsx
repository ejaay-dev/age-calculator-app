import { useEffect, useState } from "react"

const AgeCalculator = () => {
  const [day, setDay] = useState<number | string>("")
  const [month, setMonth] = useState<number | string>("")
  const [year, setYear] = useState<number | string>("")
  const [age, setAge] = useState<{
    calculatedYears: number
    calculatedMonths: number
    calculatedDays: number
  }>({
    calculatedYears: 0,
    calculatedMonths: 0,
    calculatedDays: 0,
  })

  // Get the current date
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth() + 1 // Adjusting for 0-indexed format
  const currentYear = currentDate.getFullYear()

  // Function to calculate the age
  const calculateAge = () => {
    // Convert the year, month, and days to a number
    const birthYear = Number(year)
    const birthMonth = Number(month)
    const birthDay = Number(day)
    const birthDate = new Date(birthYear, birthMonth, birthDay)

    let calculatedYears = currentYear - birthDate.getFullYear()
    let calculatedMonths = currentMonth - birthDate.getMonth()
    let calculatedDays = currentDay - birthDate.getDate()

    // Adjustment for negative days
    if (calculatedDays < 0) {
      // Borrow days from the previous month
      calculatedMonths--
      // Get the last day of the previous month
      calculatedDays += new Date(currentYear, currentMonth - 1, 0).getDate() // Last day of the previous month
    }

    // Adjustment for negative months
    if (calculatedMonths < 0) {
      // Borrow a year from the calculated years
      calculatedYears--
      calculatedMonths += 12 // Add 12 months (borrow a year)
    }

    // Set the calculated age
    setAge({ calculatedYears, calculatedMonths, calculatedDays })
  }

  // Effect hook to log age whenever it changes
  useEffect(() => {
    console.log(age) // Logs the age whenever it updates
  }, [age])

  return (
    <>
      <div className="mt-5">
        <form
          className="flex flex-row gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            calculateAge()
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="day">Day</label>
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              placeholder="DD"
              className="border"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="month">Month</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              placeholder="MM"
              className="border"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              placeholder="YYYY"
              className="border"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit">Calculate Age</button>
          </div>
        </form>
      </div>
      <div className="mt-5">
        <p>
          Your age is: {age.calculatedYears} years, {age.calculatedMonths}{" "}
          months, {age.calculatedDays} days
        </p>
      </div>
    </>
  )
}

export default AgeCalculator
