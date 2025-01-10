interface AgeResultProps {
  value: number
  label: string
}

const CalculatedResult = ({ value, label }: AgeResultProps) => {
  return (
    <>
      <div className="flex gap-2">
        <p className="font-poppins font-extrabold italic text-custom-purple text-4xl">
          {value === 0 ? "--" : value}
        </p>
        <p className="font-poppins font-extrabold italic text-4xl">{label}</p>
      </div>
    </>
  )
}

export default CalculatedResult
