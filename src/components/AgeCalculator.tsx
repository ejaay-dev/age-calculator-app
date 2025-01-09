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

  // Initialize the current date
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth() + 1 // Adjusting for 0-indexed format
  const currentYear = currentDate.getFullYear()

  // Function to calculate the age
  const calculateAge = () => {
    // Initialize the birth year, month, and day
    // Convert the year, month, and day to a number
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
      {/* Main Container */}
      <div className="flex flex-col align center h-[340px] w-full max-w-[600px] bg-custom-white border rounded-3xl rounded-br-[150px]">
        {/* Form Container */}
        <div className="mt-10 ml-10">
          <form className="flex flex-row gap-5">
            <div className="flex flex-col">
              <label
                htmlFor="day"
                className="font-poppins text-[10px] font-semibold text-smokey-grey tracking-[3px]"
              >
                DAY
              </label>
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                placeholder="DD"
                className="font-poppins text-[20px] font-semibold text-smokey-grey pl-2 border rounded-md w-24 h-10"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="month"
                className="font-poppins text-[10px] font-semibold text-smokey-grey tracking-[3px]"
              >
                MONTH
              </label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
                placeholder="MM"
                className="font-poppins text-[20px] font-semibold text-smokey-grey pl-2 border rounded-md w-24 h-10"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="year"
                className="font-poppins text-[10px] font-semibold text-smokey-grey tracking-[3px]"
              >
                YEAR
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                placeholder="YYYY"
                className="font-poppins text-[20px] font-semibold text-smokey-grey pl-2 border rounded-md w-24 h-10"
              />
            </div>
            <div
              onClick={(e) => {
                e.preventDefault()
                calculateAge()
              }}
              className="flex justify-center items-center w-16 h-16 rounded-full bg-custom-purple"
            >
              <img
                src="/public/icon-arrow.svg"
                alt="Calculate Age"
                className="w-8 h-8"
              />
            </div>
          </form>
        </div>
        {/* Result Container */}
        <div className="mt-10 ml-10">
          <p className="font-poppins text-custom-purple">
            Your age is: {age.calculatedYears} years, {age.calculatedMonths}{" "}
            months, {age.calculatedDays} days
          </p>
        </div>
      </div>
    </>
  )
}

export default AgeCalculator
