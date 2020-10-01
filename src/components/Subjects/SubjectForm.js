import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

const semesters = [
    {
        value: '1st Semester',
        label: '1st Semester',
    },
    {
        value: '2nd Semester',
        label: '2nd Semester',
    }
];
const hours = [
    {
        value: 1,
        label: 1,
    },
    {
        value: 2,
        label: 2,
    },
    {
        value: 3,
        label: 3,
    },
    {
        value: 4,
        label: 4,
    },
    {
        value: 5,
        label: 5,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function AddressForm() {
    const classes = useStyles();

    const [subName, setSubName] = React.useState('');
    const [subCode, setSubCode] = React.useState('');
    const [offeredYear, setOfferedYear] = React.useState('');
    const [offeredSemester, setOfferedSemester] = React.useState('');
    const [lecHo, setLecHo] = React.useState('');
    const [tuteHo, setTuteHo] = React.useState('');
    const [labHo, setLabHo] = React.useState('');
    const [evaHo, setEvaHo] = React.useState('');

    const handleSubNameChange = (event) => {
        setSubName(event.target.value);
    };
    const handleSubCodeChange = (event) => {
        setSubCode(event.target.value);
    };
    const handleOfferedYearChange = (event) => {
        setOfferedYear(event.target.value);
    };
    const handleOfferedSemesterChange = (event) => {
        setOfferedSemester(event.target.value);
    };
    const handleLecHoChange = (event) => {
        setLecHo(event.target.value);
    };
    const handleTuteHoChange = (event) => {
        setTuteHo(event.target.value);
    };
    const handleLabHoChange = (event) => {
        setLabHo(event.target.value);
    };
    const handleEvaHoChange = (event) => {
        setEvaHo(event.target.value);
    };

    const saveSubject = () => {
        const isValidated = validateForm();

        if(isValidated){
            const req = {
                subName: subName,
                subCode: subCode,
                offeredYear: offeredYear,
                offeredSemester: offeredSemester,
                lecHo: lecHo,
                tuteHo: tuteHo,
                labHo: labHo,
                evaHo: evaHo
            };

            axios.post("https://kaalaapi.herokuapp.com/api/subjects/add", req).then((res) => {
                if (res.data.success) {
                    //console.log(res.data);
                    swal("Successful", "Subject details added", "success");
                }else{
                    swal("Unsuccessful", "Error while adding details", "error");
                }
            });

            setSubName("");
            setSubCode("");
            setOfferedYear("");
            setOfferedSemester("");
            setLecHo("");
            setTuteHo("");
            setLabHo("");
            setEvaHo("");
        }
    };

    function validateForm() {
        let subName = document.getElementById("subNameId").value;
        let subCode = document.getElementById("subCodeId").value;
        let offeredYear = document.getElementById("offYearId").value;

        if(subName == ""){
            swal("Unsuccessful", "Subject name must be filled out", "error");
            return false;
        }
        if(subCode == ""){
            swal("Unsuccessful", "Suject code must be filled out", "error");
            return false;
        }
        if(offeredYear == ""){
            swal("Unsuccessful", "Offered year must be filled out", "error");
            return false;
        }
        return true;
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="subNameId"
                        name="employeeID"
                        label= "Subject Name"
                        value={subName}
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={handleSubNameChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="subCodeId"
                        name="employeeID"
                        label= "Subject Code"
                        value={subCode}
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={handleSubCodeChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="offYearId"
                        name="firstName"
                        label= "Offered Year"
                        value={offeredYear}
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleOfferedYearChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="Offered semester"
                        value={offeredSemester}
                        onChange={handleOfferedSemesterChange}
                        variant="filled"
                        fullWidth
                    >
                        {semesters.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="No. of lecture hours"
                        value={lecHo}
                        onChange={handleLecHoChange}
                        variant="filled"
                        fullWidth
                    >
                        {hours.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="No. of tutorial hours"
                        value={tuteHo}
                        onChange={handleTuteHoChange}
                        variant="filled"
                        fullWidth
                    >
                        {hours.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="No. of lab hours"
                        value={labHo}
                        onChange={handleLabHoChange}
                        variant="filled"
                        fullWidth
                    >
                        {hours.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="No. of evaluation hours"
                        value={evaHo}
                        onChange={handleEvaHoChange}
                        variant="filled"
                        fullWidth
                    >
                        {hours.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    // onClick={}
                    className={classes.button}
                    onClick={saveSubject}
                >
                    Add
                </Button>
            </div>
        </React.Fragment>
    );
}
