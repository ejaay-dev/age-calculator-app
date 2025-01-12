import { useEffect, useState } from "react"
import CalculatedResult from "./CalculatedResult"

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
      <div className="flex flex-col h-full w-full max-h-[360px] max-w-[280px] bg-custom-white rounded-3xl rounded-br-[80px] shadow-sm md:max-h-[460px] md:max-w-[580px] md:pl-6 md:pr-6 md:rounded-br-[140px]">
        {/* Form Container */}
        <div className="m-4 mt-10">
          <form className="flex flex-col gap-5">
            <div className="flex flex-row justify-center items-center gap-3 md:gap-5 md:justify-start">
              <div className="flex flex-col gap-1 md:gap-2">
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
                  className="h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12"
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
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
                  className="h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12"
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
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
                  className="h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12"
                />
              </div>
            </div>
            <div className="flex justify-center items-center relative mt-5 md:justify-end">
              <hr className="border-light-grey w-full" />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  calculateAge()
                }}
                className="absolute z-10 w-12 h-12 md:w-16 md:h-16 flex justify-center items-center rounded-full bg-custom-purple hover:bg-off-black"
              >
                <img
                  src="/icon-arrow.svg"
                  alt="Calculate Age"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </button>
            </div>
          </form>
        </div>
        {/* Result Container */}
        <div className="flex flex-col gap-2 m-4 mt-8">
          <CalculatedResult value={age.calculatedYears} label="years" />
          <CalculatedResult value={age.calculatedMonths} label="months" />
          <CalculatedResult value={age.calculatedDays} label="days" />
        </div>
      </div>
    </>
  )
}

export default AgeCalculator
