# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![Desktop](./design/desktop-design.jpg)
![Mobile](./design/mobile-design.jpg)

### Links

- Solution URL: [Github Repo](https://github.com/ejaay-dev/age-calculator-app)
- Live Site URL: [Site Demo](https://age-calculator-app-six-theta.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Tailwind](https://tailwindcss.com/) - For styles
- [Zod](https://zod.dev/) - For validations

### What I learned

- I learned how to use ZOD for input validations

```ts
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
    .refine((val) => val.length === 0 || /^\d{4}$/.test(val), {
      message: "Invalid year (YYYY)",
    })
    .transform((val) => parseInt(val)),
  // .refine((val) => val <= new Date().getFullYear(), {
  //   message: "Must be in the past",
  // })
})
```

- I learned how to reset validation error when input changes using React JS hook (useEffect)

```js
useEffect(() => {
  if (day) setDayError(null)
  if (month) setMonthError(null)
  if (year) setYearError(null)
}, [day, month, year])
```

## Author

- Frontend Mentor - [@ejaay-dev](https://www.frontendmentor.io/profile/ejaay-dev)
- Github - [@ejaay-dev](https://github.com/ejaay-dev)
- LinkedIn - [@errolignacio](https://www.linkedin.com/in/errolignacio)
