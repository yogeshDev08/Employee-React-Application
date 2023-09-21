import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Container,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeData, ExperienceDetail } from '../Constants/interface';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface Experience {
    id: number;
    companyName: string;
    experiences: {
        duration: string;
        designation: string;
    };
}

const initialExperience: Experience = {
    id: 1,
    companyName: '',
    experiences: {
        duration: '',
        designation: '',
    }
};

const experienceValidationSchema = Yup.object().shape({
    "companyName-1": Yup.string().required('Company Name is required'),
    'experiences-1-duration': Yup.string().required('Duration is required'),
    'experiences-1-designation': Yup.string().required('Designation is required'),
});

function NewExperienceForm() {
    const location = useLocation()
    const dispatch = useDispatch<any>()
    const store = useSelector((state: any) => state.employee)
    const [formData, setFormData] = useState([initialExperience]);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: [initialExperience],
        validationSchema: experienceValidationSchema,
        onSubmit: (values) => {
            // Handle form submission here, e.g., add the experience detail to your state
            console.log('Experience Form submitted with values:', values);
        },
    });

    const handleAddExperience = () => {
        formik.submitForm(); // Submit the current experience detail
        formik.resetForm(); // Reset the form for the next experience detail
    };

    useEffect(() => {
        if (store.experienceDetails.length > 0) {
            formik.setValues(store && [...JSON.parse(JSON.stringify(store.experienceDetails))])
            setFormData([...JSON.parse(JSON.stringify(store.experienceDetails))])
        }
    }, [store])

    const handleDeleteExperience = (employeeDetail: ExperienceDetail) => {
        const newList = formData.filter((element) => element.id !== employeeDetail.id)
        if (newList.length > 0) formik.setValues(newList)
    }

    const addExperience = () => {
        const newFiled = {
            id: formData.length > 0 ? Math.max(...formData.map(item => item.id)) + 1 : 1,
            companyName: '',
            experiences: { duration: '', designation: '' }
        }
        // setFormData([...formData, newFiled]);
        formik.setValues([...formData, newFiled])
    };

    useEffect(() => {
        setFormData([...formik?.values])
    }, [...formik?.values])
    console.log('formik?.values', formik?.values)
    // console.log('formik.touched', formik.touched)
    // console.log('formData', formData)
    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                {formData.map((employeeDetail) => (
                    <Grid
                        container
                        spacing={2}
                        key={employeeDetail.id}
                        sx={{
                            marginBottom: "2%",
                            display: "flex",
                            flexWrap: "inherit",
                            alignItems: "flex-start"
                        }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id={`companyName-${employeeDetail.id}`}
                                name={`companyName-${employeeDetail.id}`}
                                label="Company Name"
                                variant="outlined"
                                value={employeeDetail.companyName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                // helperText={formik.touched.companyName && formik.errors.companyName}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id={`experiences-${employeeDetail.id}-duration`}
                                name={`experiences-${employeeDetail.id}-duration`}
                                label="Duration (Years)"
                                variant="outlined"
                                value={employeeDetail?.experiences?.duration}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            //   error={formik.touched['experiences.duration'] && Boolean(formik.errors['experiences.duration'])}
                            //   helperText={formik.touched['experiences.duration'] && formik.errors['experiences.duration']}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id={`designation-${employeeDetail.id}-label`}>Designation</InputLabel>
                                <Select
                                    labelId={`designation-${employeeDetail.id}-label`}
                                    id={`designation-${employeeDetail.id}-label`}
                                    name={`designation-${employeeDetail.id}-label`}
                                    value={employeeDetail?.experiences?.designation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="Designation"
                                // error={formik.touched.experiences.designation. && Boolean(formik.errors['experiences.designation'])}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                                    <MenuItem value="Product Manager">Product Manager</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {formData.length > 1 && (<Button
                            variant="outlined"
                            color='warning'
                            onClick={() => handleDeleteExperience(employeeDetail)}
                            sx={{ margin: "2%", boxShadow: "3px 2px 9px -2px #ff00008c" }}>
                            <RemoveCircleOutlineIcon color='warning' />
                        </Button>)}
                    </Grid>
                ))}
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="button" variant="outlined" onClick={addExperience} style={{ margin: "1% 0", width: "316px" }}>
                        Add Experience
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" onClick={handleAddExperience}>
                        Submit & Finish
                    </Button>
                </Grid>
            </form>
        </Container >
    );
}

export default NewExperienceForm;
