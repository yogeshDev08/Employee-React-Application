import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles'; // Import styled utility
import { useDispatch, useSelector } from 'react-redux';
import { personalDetailsUpdate } from '../src/Redux/employeeCrud';
import CustomTypography from '../src/Component/customTypo'
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { EmployeeData } from '../src/Constants/interface';
import { genderOptions } from '../src/Constants/StaticData';

const classes = {
    root: `root`,
}
const Root = styled('form')(() => ({
    [`&.${classes.root}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: (theme: any) => theme.spacing(2),
        maxWidth: '500px',
        margin: '0 auto',
    }
}))

const fieldCss: any = {
    margin: "2% 0%"
}



function PersonalDetailsFrom({ setPageChange }: any) {
    const [errorMessage, setErrorMessage] = React.useState('')
    const location = useLocation()
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        contactNumber: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const dispatch = useDispatch<any>()
    const store = useSelector((state: any) => state.employee)
    useEffect(() => {
        if (store.personalDetails) {
            setFormData(store.personalDetails)
        }
    }, [store])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (location.pathname.split('/')[2]) {
            dispatch(personalDetailsUpdate(formData))
            setPageChange(2)
        } else {
            const emailCheck = store.list.filter((elem: EmployeeData) => elem.email === formData.email)
            if (emailCheck.length === 0) {
                dispatch(personalDetailsUpdate(formData))
                setPageChange(2)
            } else {
                setErrorMessage('Email id already exist')
            } 
        }
    };

    return (
        <>
        <CustomTypography value={"Personal Detail From"}/>
            <Root className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    type="text"
                    required
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    style={fieldCss}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    type="text"
                    required
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                    style={fieldCss}
                />
                <FormControl variant="outlined" required style={fieldCss}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        {genderOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    type="email"
                    required
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    style={fieldCss}
                />
                {errorMessage && <Typography style={{color: "red"}}>{errorMessage}</Typography>}
                <TextField
                    label="Contact Number"
                    name="contactNumber"
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    value={formData.contactNumber}
                    onChange={handleChange}
                    style={fieldCss}
                />
                <TextField
                    label="City"
                    name="city"
                    variant="outlined"
                    type="text"
                    fullWidth
                    required
                    value={formData.city}
                    onChange={handleChange}
                    style={fieldCss}
                />
                <TextField
                    label="State"
                    name="state"
                    variant="outlined"
                    fullWidth
                    required
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    style={fieldCss}
                />
                <TextField
                    label="Zip Code"
                    name="zipCode"
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    value={formData.zipCode}
                    onChange={handleChange}
                    style={fieldCss}
                />
                <Button type="submit" variant="contained" color="primary" style={fieldCss}>
                    Next Page
                </Button>
            </Root>
        </>
    );
}

export default PersonalDetailsFrom;
