import { useEffect, useState } from "react"
import { z } from "zod"
import CalculatedResult from "./CalculatedResult"
import { dateFormSchema } from "../utils/form-schema"

const AgeCalculator = () => {
  const [day, setDay] = useState<string>("")
  const [month, setMonth] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [age, setAge] = useState<{
    calculatedYears: number
    calculatedMonths: number
    calculatedDays: number
  }>({
    calculatedYears: 0,
    calculatedMonths: 0,
    calculatedDays: 0,
  })

  // Error state for each input field
  const [dayError, setDayError] = useState<string | null>(null)
  const [monthError, setMonthError] = useState<string | null>(null)
  const [yearError, setYearError] = useState<string | null>(null)

  // Initialize the current date
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth() + 1 // Adjusting for 0-indexed format
  const currentYear = currentDate.getFullYear()

  // Function to check if the given month has 31 days
  const checkIfMonthHas31Days = (month: number, year: number) => {
    const nextMonth = month === 12 ? 0 : month // If it is December, the next month is January (0-indexed)
    const nextMonthDate = new Date(year, nextMonth, 0) // Get the last day of the current month
    return nextMonthDate.getDate() === 31
  }

  // Function to calculate the age
  const calculateAge = () => {
    try {
      // Clear previous errors
      setDayError(null)
      setMonthError(null)
      setYearError(null)

      // Validate the inputs using Zod schema
      const parsedData = dateFormSchema.parse({ day, month, year })
      console.log("Parsed Data:", parsedData)

      // Initialize the birth year, month, and day
      const birthYear = parsedData.year
      const birthMonth = parsedData.month - 1
      const birthDay = parsedData.day
      const birthDate = new Date(birthYear, birthMonth, birthDay)

      // Validate if the inputted date is not in the future
      if (birthDate.getTime() > currentDate.getTime()) {
        setDayError("Must be in the past")
        setMonthError("Must be in the past")
        setYearError("Must be in the past")
        setAge({ calculatedYears: 0, calculatedMonths: 0, calculatedDays: 0 })
        return
      }

      // Check if the month has 31 days
      const isValid31Days = checkIfMonthHas31Days(birthMonth + 1, birthYear)
      // console.log("birthDay: ", birthDay)
      // console.log("isValid31Days: ", isValid31Days)
      if (birthDay === 31 && !isValid31Days) {
        setDayError("Invalid date")
        setAge({
          calculatedDays: 0,
          calculatedMonths: 0,
          calculatedYears: 0,
        })

        useEffect(() => {
          console.log(age)
        }, [age])
      }

      //  Calculation for the date (currentDate - birthDate)
      let calculatedYears = currentYear - birthDate.getFullYear()
      let calculatedMonths = currentMonth - birthDate.getMonth() - 1
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
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Zod Validation Errors: ", error.errors) // Log validation error from Zod

        // Extract and set specific errors for each input field
        error.errors.forEach((e) => {
          if (e.path[0] === "day") {
            setDayError(e.message)
          } else if (e.path[0] === "month") {
            setMonthError(e.message)
          } else if (e.path[0] === "year") {
            setYearError(e.message)
          }
        })
      }
    }
  }

  // Effect hook to reset errors when the input changes
  useEffect(() => {
    if (day) setDayError(null)
    if (month) setMonthError(null)
    if (year) setYearError(null)
  }, [day, month, year])

  // Effect hook to log error whenever it changes
  // useEffect(() => {
  //   console.log("Day Error: ", dayError)
  //   console.log("Month Error: ", monthError)
  //   console.log("Year Error:", yearError)
  // }, [dayError, monthError, yearError])

  return (
    <>
      {/* Main Container */}
      <div className="flex flex-col h-full w-full max-h-[400px] max-w-[280px] bg-custom-white rounded-3xl rounded-br-[80px] shadow-sm md:max-h-[500px] md:max-w-[580px] md:pl-6 md:pr-6 md:rounded-br-[140px]">
        {/* Form Container */}
        <div className="m-4 mt-10">
          <form className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-center gap-3 md:gap-5 md:justify-start">
              <div className="flex flex-col gap-1 md:gap-2">
                <label
                  htmlFor="day"
                  className={`font-poppins text-[10px] font-semibold tracking-[3px] ${
                    dayError ? "text-red-500" : "text-smokey-grey "
                  }`}
                >
                  DAY
                </label>
                <input
                  type="text"
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                  placeholder="DD"
                  className={`h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12 focus:outline-none ${
                    dayError ? "border-red-500" : "focus:border-custom-purple"
                  }`}
                />
                <div className="flex items-center justify-start h-8 md:h-4">
                  {dayError && (
                    <p className="text-red-400 text-[10px] italic font-poppins">
                      {dayError}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <label
                  htmlFor="month"
                  className={`font-poppins text-[10px] font-semibold  tracking-[3px] ${
                    monthError ? "text-red-500" : "text-smokey-grey"
                  }`}
                >
                  MONTH
                </label>
                <input
                  type="text"
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                  placeholder="MM"
                  className={`h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12 focus:outline-none ${
                    monthError ? "border-red-500" : "focus:border-custom-purple"
                  }`}
                />
                <div className="flex items-center justify-start h-8 md:h-4">
                  {monthError && (
                    <p className="text-red-400 text-[10px] italic font-poppins">
                      {monthError}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <label
                  htmlFor="year"
                  className={`font-poppins text-[10px] font-semibold tracking-[3px] ${
                    yearError ? "text-red-500" : "text-smokey-grey"
                  }`}
                >
                  YEAR
                </label>
                <input
                  type="text"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  placeholder="YYYY"
                  className={`h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12 focus:outline-none ${
                    yearError ? "border-red-500" : "focus:border-custom-purple"
                  }`}
                />
                <div className="flex items-center justify-start h-8 md:h-4">
                  {yearError && (
                    <p className="text-red-400 text-[10px] italic font-poppins">
                      {yearError}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Button Container */}
            <div className="relative flex items-center justify-center mt-4 md:justify-end">
              <hr className="w-full border-light-grey" />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  calculateAge()
                }}
                className="absolute z-10 flex items-center justify-center w-12 h-12 rounded-full md:w-16 md:h-16 bg-custom-purple hover:bg-off-black"
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
        <div className="flex flex-col gap-2 m-6 mt-8">
          <CalculatedResult value={age.calculatedYears} label="years" />
          <CalculatedResult value={age.calculatedMonths} label="months" />
          <CalculatedResult value={age.calculatedDays} label="days" />
        </div>
      </div>
    </>
  )
}

export default AgeCalculator
