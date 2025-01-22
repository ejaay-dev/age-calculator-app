import { useEffect, useState } from "react"

interface AgeResultProps {
  ageValue: number
  dateLabel: string
}

const CalculatedResult = ({ ageValue, dateLabel }: AgeResultProps) => {
  const [currentValue, setCurrentValue] = useState<number>(0)

  useEffect(() => {
    const animationDuration = 1 // This sets the total duration of the animation in seconds. The animation will take 1 second/s to complete.
    const steps = 50 // number of steps (higher is smoother)
    const stepTime = (animationDuration * 1000) / steps // time per step in millisecond
    const increment = ageValue / steps // increment per step

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep += 1
      setCurrentValue((prev) => Math.min(prev + increment, ageValue)) // Prevent overshooting
      if (currentStep >= steps) {
        clearInterval(interval) // Stop once we reach the target value
      }
    }, stepTime)

    // Cleanup function to clear the interval when the component unmounts or when the value changes
    return () => {
      clearInterval(interval) // Clear the interval if the effect is cleaned up
    }
  }, [ageValue]) // Re-run the effect whenever the 'value' prop changes

  return (
    <>
      <div className="flex gap-2">
        <p className="text-4xl italic font-extrabold font-poppins text-custom-purple md:text-7xl">
          {currentValue === 0 ? "--" : Math.round(currentValue)}{" "}
          {/* Rounded value */}
        </p>
        <p className="text-4xl italic font-extrabold font-poppins md:text-7xl">
          {dateLabel}
        </p>
      </div>
    </>
  )
}

export default CalculatedResult
