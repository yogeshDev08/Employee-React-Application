import React, { useState, useEffect } from 'react'
import ExperienceForm from '../Component/ExperienceDetailsForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { personalDetailsUpdate, bankDetailsUpdate, experienceDetailUpdate } from '../Redux/employeeCrud'
import { EmployeeData } from '../Constants/interface'
import PersonDetailForm from '../Component/PersonalDetailsForm'
import BankDetailForm from '../Component/FormikBankDetialsForm'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Button } from '@mui/material'

const steps = ['Personal Details Form', 'Bank Details Form', 'Experience Form'];

const EditForm = () => {
  const [pageChange, setPageChange] = useState(1)
  const store = useSelector((state: any) => state.employee)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<any>()
  const handleStepper = (val: number) => {
    if (val > 1) {
      setPageChange(val - 1)
    }
  }

  useEffect(() => {
    if (store?.list?.length > 0) {
      const employedetials = store?.list?.filter((elem: EmployeeData) => elem?.id === Number(location.pathname.split('/')[2]))
      if (employedetials.length > 0) {
        dispatch(personalDetailsUpdate(employedetials[0]?.personalDetails))
        dispatch(bankDetailsUpdate(employedetials[0]?.bankDetails))
        dispatch(experienceDetailUpdate(employedetials[0]?.experienceDetails))
      }
    }
  }, [])

  const handleBackBtnCss = () => {
    if(pageChange === 1) return { marginTop: "-64px", marginLeft: "812px", padding: "1%"}
    else if (pageChange === 2) return{ marginTop: "-63px", marginLeft: "831px", padding: "1%"}
    else return { marginTop: "-64px", padding: "1% 1% 1% 107px", display:"flex", justifyContent:"flex-end"}
  }

  return (
    <div className='flex justify-center mt-28'>
      <Card className='shadow-xl pb-4 w-3/4'>
      <Stepper className='p-6'nonLinear activeStep={pageChange - 1}>
      {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit">
              {label}
            </StepButton>
          </Step>
        ))}

      </Stepper>
        <CardContent>
          {pageChange === 1 && (
            <PersonDetailForm
              setPageChange={setPageChange}
            />
          )}
          {pageChange === 2 && (
            <BankDetailForm
              setPageChange={setPageChange}
            />
          )}
          {pageChange === 3 && (
            <ExperienceForm />
          )}

        </CardContent>
        <div  className='backbutton' style={handleBackBtnCss()}>
          <Button
          className="animationBtn1"
            variant='outlined'
            color='primary'
            sx={{width: pageChange === 3 ? "13%": "none", marginRight: pageChange === 3 ? "198px": "none", }}
            onClick={() => {
              handleStepper(pageChange)
              if (pageChange === 1) navigate('/')
            }}
            >
          {pageChange !== 1 ? "Back" : "Cancel"}
        </Button>
    </div>
      </Card >
    </div >
  )
}

export default EditForm