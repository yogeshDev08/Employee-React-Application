import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Container,
    Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { bankDetailsUpdate } from '../Redux/employeeCrud';
import CustomTypography from './customTypo';

interface BankFormData {
    bankName: string; 
    ifscCode: string;
    accountNumber: string;
    panCardNumber: string;
}

const bankValidationSchema = Yup.object().shape({
    bankName: Yup.string().required('Bank Name is required'),
    ifscCode: Yup.string().required('IFSC Code is required'),
    accountNumber: Yup.string().required('Account Number is required'),
    panCardNumber: Yup.string().required('Pan Card Number is required'),
});

function BankDetailForm({ setPageChange }: any) {
    const dispatch = useDispatch<any>()
    const store = useSelector((state: any) => state.employee)
    const formik = useFormik<BankFormData>({
        initialValues: {
            bankName: '',
            ifscCode: '',
            accountNumber: '',
            panCardNumber: '',
        },
        validationSchema: bankValidationSchema,
        onSubmit: (values) => {
            // Handle bank form submission here, e.g., send data to the server
            console.log('Bank Form submitted with values:', values);
            dispatch(bankDetailsUpdate(values))
            setPageChange(3)
        },
    });

    useEffect(() => {
        if (store.bankDetails.panCardNumber) {
            formik.setValues(store.bankDetails)
        }
    }, [store])

    return (
        <Container className='bankForm'>
            <CustomTypography value={"Bank Details Form"} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="bankName"
                            name="bankName"
                            label="Bank Name"
                            variant="outlined"
                            value={formik.values.bankName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.bankName && Boolean(formik.errors.bankName)}
                            helperText={formik.touched.bankName && formik.errors.bankName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="ifscCode"
                            name="ifscCode"
                            label="IFSC Code"
                            variant="outlined"
                            value={formik.values.ifscCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.ifscCode && Boolean(formik.errors.ifscCode)}
                            helperText={formik.touched.ifscCode && formik.errors.ifscCode}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="accountNumber"
                            name="accountNumber"
                            label="Account Number"
                            variant="outlined"
                            value={formik.values.accountNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                            helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="panCardNumber"
                            name="panCardNumber"
                            label="Pan Card Number"
                            variant="outlined"
                            value={formik.values.panCardNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.panCardNumber && Boolean(formik.errors.panCardNumber)}
                            helperText={formik.touched.panCardNumber && formik.errors.panCardNumber}
                        />
                    </Grid>
                    <Grid item xs={12}  sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Button variant="contained" color="primary" type="submit">
                            Next Page
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default BankDetailForm;
