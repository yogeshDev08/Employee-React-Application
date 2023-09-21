import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { listDataUpdate } from '../Redux/employeeCrud';
import CustomTypography from './customTypo';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmployeeData, ExperienceDetail } from '../Constants/interface';
import CustomButton from './CustomButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Container, Grid } from '@mui/material';

const classes = {
    root: `experienceform`,
    experienceItem: `experienceItem`
}
const Root = styled('form')(() => ({
    [`&.${classes.root}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: (theme: any) => theme.spacing(2),
        margin: '0 auto',
    }
}))

const initialState: ExperienceDetail = {
    id: 1,
    companyName: '',
    experiences: { duration: '', designation: '' }
}


function ExperienceForm() {
    const location = useLocation()
    const dispatch = useDispatch<any>()
    const store = useSelector((state: any) => state.employee)
    const [formData, setFormData] = useState([initialState]);
    const [error, setError] = useState<any>({})
    console.log("🚀 ~ file: ExperienceDetailsForm.tsx:42 ~ ExperienceForm ~ error:", error)
    const navigate = useNavigate()

    useEffect(() => {
        if (store.experienceDetails.length > 0) {
            setFormData([...JSON.parse(JSON.stringify(store.experienceDetails))])
        }
    }, [store])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, employeeDetail: ExperienceDetail) => {
        const tempList = [...formData]
        const { value } = e.target;
        tempList.forEach((element: any) => {
            if (element.id === employeeDetail.id) {
                element.companyName = value
            }
        });
        setFormData([...tempList]);
    };

    const handleExperienceChange = (e: any, employeeDetail: ExperienceDetail) => {
        const tempList = [...formData]
        const { name, value } = e.target;
        tempList.forEach((element: any) => {
            if (element.id === employeeDetail.id) {
                element.experiences[name] = value
            }
        });
        setFormData([...tempList]);
    };

    const addExperience = () => {
        const newFiled = {
            id: formData.length > 0 ? Math.max(...formData.map(item => item.id)) + 1 : 1,
            companyName: '',
            experiences: { duration: '', designation: '' }
        }
        setFormData([...formData, newFiled]);
    };
    const handleListUpdate = () => {
        const tempList = [...JSON.parse(JSON.stringify(store?.list))]
        if (location.pathname.split('/')[2]) {
            tempList.forEach((element: EmployeeData) => {
                if (element.id === Number(location.pathname.split('/')[2])) {
                    element.firstName = store?.personalDetails?.firstName
                    element.lastName = store?.personalDetails?.lastName
                    element.email = store?.personalDetails?.email
                    element.personalDetails = { ...store?.personalDetails }
                    element.bankDetails = { ...store?.bankDetails }
                    element.experienceDetails = [...formData]

                }
            });
        } else {
            const newEntry: EmployeeData = {
                id: tempList.length > 0 ? Math.max(...tempList.map(item => item.id)) + 1 : 1,
                lastName: store?.personalDetails?.firstName,
                firstName: store?.personalDetails?.lastName,
                email: store?.personalDetails?.email,
                personalDetails: { ...store?.personalDetails },
                bankDetails: { ...store?.bankDetails },
                experienceDetails: [...formData]
            }
            dispatch(listDataUpdate([...tempList, newEntry]))
            navigate('/')
            return
        }
        dispatch(listDataUpdate(tempList))
        navigate('/')
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleListUpdate()
    };

    const handleDeleteExperience = (employeeDetail: ExperienceDetail) => {
        const newList = formData.filter((element) => element.id !== employeeDetail.id)
        if (newList.length > 0) setFormData(newList)
    }

    return (
        <Container>
            <CustomTypography value={"Experience Details Form"} />
            <Root 
            className={classes.root} 
            onSubmit={handleSubmit} 
            onFocus={(e) => setError({ ...error, [e.target.id]: e.target.value })} 
            onBlur={(e) => setError({ ...error, [e.target.id]: e.target.value })}>

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
                                id={`Company/${employeeDetail.id}`}
                                label="Company Name"
                                name="companyName"
                                variant="outlined"
                                required
                                fullWidth
                                onInvalid={(e) => console.log('on invalid', e)}
                                type="text"
                                value={employeeDetail.companyName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, employeeDetail)}
                                style={{ marginBottom: "1%" }}
                                error={error && error[`Company/${employeeDetail.id}`] === "" && "Please fill the Company name"}
                                helperText={error && error[`Company/${employeeDetail.id}`] === "" && "Please fill the Company name"}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id={`Duration/${employeeDetail.id}`}
                                label="Duration (Years)"
                                name="duration"
                                variant="outlined"
                                required
                                type="number"
                                value={employeeDetail.experiences.duration}
                                onChange={(e) => handleExperienceChange(e, employeeDetail)}
                                error={error && error[`Duration/${employeeDetail.id}`] === "" && "Please fill the Duration"}
                                helperText={error && error[`Duration/${employeeDetail.id}`] === "" && "Please fill the Duration"}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                id={`Designation/${employeeDetail.id}`}
                                label="Designation"
                                name="designation"
                                required
                                variant="outlined"
                                value={employeeDetail.experiences.designation}
                                onChange={(e) => handleExperienceChange(e, employeeDetail)}
                                sx={{ width: "100%" }}
                                error={error && error[`Duration/${employeeDetail.id}`] === "" && "Please fill the Designation"}
                            >
                                <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                                <MenuItem value="Product Manager">Product Manager</MenuItem>
                                <MenuItem value="Data Scientist">Data Scientist</MenuItem>
                            </Select>
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
                    <Button variant="contained" color="primary" type="submit">
                        Submit & Finish
                    </Button>
                </Grid>

            </Root>
        </Container>
    );
}

export default ExperienceForm;
