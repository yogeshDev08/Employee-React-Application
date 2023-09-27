import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { bankDetailsUpdate } from '../src/Redux/employeeCrud';
import CustomTypography from '../src/Component/customTypo';

const classes = {
  root: `root`,
}
const Root = styled('form')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: (theme: any) => theme.spacing(2),
    maxWidth: '500px',
    margin: '0 auto',
  }
}))

function BankDetailsForm({ setPageChange }: any) {
  const [formData, setFormData] = React.useState({
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    panCardNumber: '',
  });

  const dispatch = useDispatch<any>()
  const store = useSelector((state: any) => state.employee)
  useEffect(() => {
    if (store.bankDetails) {
      setFormData(store.bankDetails)
    }
  }, [store])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(bankDetailsUpdate(formData))
    setPageChange(3)
  };

  const fieldCss: any = {
    margin: "2% 0%"
}


  return (
    <>
      <CustomTypography value={"Bank Detail From"} />
      <Root className={classes.root}  onSubmit={handleSubmit}>
        <TextField
          label="Bank Name"
          name="bankName"
          variant="outlined"
          required
          type="text"
          fullWidth
          value={formData.bankName}
          onChange={handleChange}
          style={fieldCss}
        />
        <TextField
          label="IFSC Code"
          name="ifscCode"
          variant="outlined"
          required
          fullWidth
          value={formData.ifscCode}
          onChange={handleChange}
          style={fieldCss}
        />
        <TextField
          label="Account Number"
          name="accountNumber"
          variant="outlined"
          required
          type="number"
          fullWidth
          value={formData.accountNumber}
          onChange={handleChange}
          style={fieldCss}
        />
        <TextField
          label="PAN Card Number"
          name="panCardNumber"
          variant="outlined"
          required
          fullWidth
          value={formData.panCardNumber}
          onChange={handleChange}
          style={fieldCss}
        />
        <Button className="animationBtn1" type="submit" variant="contained" color="primary" style={fieldCss}>
          Next Page
        </Button>
      </Root>
    </>
  );
}

export default BankDetailsForm;
