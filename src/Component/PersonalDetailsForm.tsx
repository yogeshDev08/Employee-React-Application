import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Grid,
} from '@mui/material';
import { EmployeeData, FormData } from '../Constants/interface';
import { useLocation } from 'react-router-dom';
import { personalDetailsUpdate } from '../Redux/employeeCrud';
import CustomTypography from './customTypo';


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    contactNumber: Yup.string()
        .matches(/^\d{10}$/, 'Contact No should be 10 digits')
        .required('Contact No is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip Code is required'),
})

function PersonDetailForm({ setPageChange }: any) {
    const location = useLocation()
    const dispatch = useDispatch<any>()
    const store = useSelector((state: any) => state.employee)
    const formik = useFormik<FormData>({
        initialValues: {
            city: "",
            contactNumber: "",
            email: "",
            firstName: "",
            gender: "",
            lastName: "",
            state: "",
            zipCode: ""
        },
        validationSchema,

        onSubmit: (values) => {
            // Handle form submission here, e.g., send data to the server
            console.log('Form submitted with values:', values);
            if (location.pathname.split('/')[2]) {
                dispatch(personalDetailsUpdate(values))
                setPageChange(2)
            } else {
                const emailCheck = store.list.filter((elem: EmployeeData) => elem.email === values.email)
                if (emailCheck.length === 0) {
                    dispatch(personalDetailsUpdate(values))
                    setPageChange(2)
                }
            }
        },
    });

    useEffect(() => {
        if (store?.personalDetails?.firstName) {
            formik.setValues(store.personalDetails)
        }
    }, [store])
    return (
        <Container className='personalFrom'>
            <CustomTypography value={"Personal Details Form"} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            className='testAnimation'
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className='testAnimation'
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                className='testAnimation'
                                labelId="gender-label"
                                id="gender"
                                name="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Gender"
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className='testAnimation'
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className='testAnimation'
                            fullWidth
                            id="contactNumber"
                            name="contactNumber"
                            label="Contact No"
                            variant="outlined"
                            value={formik.values.contactNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                            helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className='testAnimation'
                            fullWidth
                            id="city"
                            name="city"
                            label="City"
                            variant="outlined"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className='testAnimation'
                            fullWidth
                            id="state"
                            name="state"
                            label="State"
                            variant="outlined"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className='testAnimation'
                            fullWidth
                            id="zipCode"
                            name="zipCode"
                            label="Zip Code"
                            variant="outlined"
                            value={formik.values.zipCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                            helperText={formik.touched.zipCode && formik.errors.zipCode}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button className="animationBtn1" variant="contained" color="primary" type="submit">
                            Next Page
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default PersonDetailForm;
