import { z } from "zod"

// Define the validation schema for the date inputs (Day, Month, and Year)
export const dateFormSchema = z.object({
  day: z
    .string()
    .min(1, { message: "This field is required" })
    .refine(
      (val) => val === "" || /^(0[1-9]|[1-9]|[12][0-9]|3[01])$/.test(val),
      {
        message: "Must be a valid day",
      }
    )
    .transform((val) => parseInt(val)),
  // .refine((val) => !isNaN(val), { message: "This is not a valid day!" })
  month: z
    .string()
    .min(1, { message: "This field is required" })
    .refine((val) => val === "" || /^(1[0-2]|[1-9]|0[1-9])$/.test(val), {
      message: "Must be a valid month",
    })
    .transform((val) => parseInt(val)),
  // .refine((val) => !isNaN(val), { message: "This is not a valid month!" })
  year: z
    .string()
    .min(1, { message: "This field is required" })
    .refine((val) => val.length === 0 || /^\d{4}$/.test(val), {
      message: "Must be a valid year",
    })
    .transform((val) => parseInt(val)),
  // .refine((val) => val <= new Date().getFullYear(), {
  //   message: "Must be in the past",
  // })
})
