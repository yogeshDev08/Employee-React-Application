import { useState } from 'react'
import BankDetailsForm from './BankDetailsForm'
import ExperienceForm from '../src/Component/ExperienceDetailsForm'
import PersonDetailForm from '../src/Component/PersonalDetailsForm'
import { Button } from '@mui/material'

const AddForm = () => {
  const [pageChange, setPageChange] = useState(1)
  const handleStepper = (val: number) => {
    if (val > 1) {
      setPageChange(val - 1)
    }
  }
  return (
    <div>
    {pageChange === 1 && (
      <PersonDetailForm
        setPageChange={setPageChange}
      />
    )}
    {pageChange === 2 && (
      <BankDetailsForm
        setPageChange={setPageChange}
      />
    )}
    {pageChange === 3 && (
      <ExperienceForm/>
    )}
    <Button className="animationBtn1" disabled={pageChange === 1}
        onClick={() => handleStepper(pageChange)}
        style={{ width: "500px" }}>
        Back
      </Button>
  </div>
  )
}

export default AddForm