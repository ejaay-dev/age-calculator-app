import { useEffect, useState } from "react"
import { z } from "zod"
import CalculatedResult from "./CalculatedResult"

// Defining the validation schema using Zod (Day, Month, and Year)
const dateFormSchema = z.object({
  day: z
    .string()
    .min(1, { message: "This field is required" })
    .refine((val) => val === "" || /^(0[1-9]|[12][0-9]|3[01])$/.test(val), {
      message: "Must be a valid day",
    })
    .transform((val) => parseInt(val)),
  // .refine((val) => !isNaN(val), { message: "This is not a valid day!" })
  month: z
    .string()
    .min(1, { message: "This field is required" })
    .refine((val) => val === "" || /^(0[1-9]|1[0-2])$/.test(val), {
      message: "Must be a valid month",
    })
    .transform((val) => parseInt(val)),
  // .refine((val) => !isNaN(val), { message: "This is not a valid month!" })
  year: z
    .string()
    .min(1, { message: "This field is required" })
    .refine((val) => val === "" || /^\d{4}$/.test(val), {
      message: "Must be a valid year",
    })
    .transform((val) => parseInt(val)),
})

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
          }
          if (e.path[0] === "month") {
            setMonthError(e.message)
          }
          if (e.path[0] === "year") {
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
      <div className="flex flex-col h-full w-full max-h-[360px] max-w-[280px] bg-custom-white rounded-3xl rounded-br-[80px] shadow-sm md:max-h-[460px] md:max-w-[580px] md:pl-6 md:pr-6 md:rounded-br-[140px]">
        {/* Form Container */}
        <div className="m-4 mt-10">
          <form className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-center gap-3 md:gap-5 md:justify-start">
              <div className="flex flex-col gap-1 md:gap-2">
                <label
                  htmlFor="day"
                  className="font-poppins text-[10px] font-semibold text-smokey-grey tracking-[3px]"
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
                  className="h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12"
                />{" "}
                {dayError && (
                  <p className="text-red-400 text-[10px] italic font-poppins">
                    {dayError}
                  </p>
                )}
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
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                  placeholder="MM"
                  className="h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12"
                />
                {monthError && (
                  <p className="text-red-400 text-[10px] italic font-poppins">
                    {monthError}
                  </p>
                )}
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
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  placeholder="YYYY"
                  className="h-10 w-full max-w-28 font-poppins text-[20px] font-semibold text-off-black pl-2 border border-light-grey rounded-md md:h-12"
                />
                {yearError && (
                  <p className="text-red-400 text-[10px] italic font-poppins">
                    {yearError}
                  </p>
                )}
              </div>
            </div>

            {/* Show validation error */}
            {/* {validationError && (
              <p className="mt-2 text-sm text-red-500">{validationError}</p>
            )} */}

            {/* Button Container */}
            <div className="relative flex items-center justify-center mt-5 md:justify-end">
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
