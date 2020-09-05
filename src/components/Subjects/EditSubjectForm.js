import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Link} from "react-router-dom";

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

export default function AddressForm(props) {
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

    useEffect(() => {
        console.log(props)
        axios.get('http://localhost:5000/api/subjects/edit/' +props.subjectID)
            .then(response => {
                setSubName(response.data.subName);
                setSubCode(response.data.subCode);
                setOfferedYear(response.data.offeredYear);
                setOfferedSemester(response.data.offeredSemester);
                setLecHo(response.data.lecHo);
                setTuteHo(response.data.tuteHo);
                setLabHo(response.data.labHo);
                setEvaHo(response.data.evaHo);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="employeeID"
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
                        id="employeeID"
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
                        id="firstName"
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
                    className={classes.button}
                    // onClick={updateLecturer}
                >
                    Update
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    // onClick={deleteLecturer}
                >
                    Delete
                </Button>

            </div>
        </React.Fragment>
    );
}
