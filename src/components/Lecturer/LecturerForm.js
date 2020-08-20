import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";

const departments = [
    {
        value: 'Department of Information Technology',
        label: 'Department of Information Technology',
    },
    {
        value: 'Department of Computer Science and Software Engineering',
        label: 'Department of Computer Science and Software Engineering',
    },
    {
        value: 'Department of Computer Systems Engineering',
        label: 'Department of Computer Systems Engineering',
    },
];

const faculities = [
    {
        value: 'Faculty of Computing',
        label: 'Faculty of Computing',
    },
    {
        value: 'Faculty of Engineering',
        label: 'Faculty of Engineering',
    },
    {
        value: 'Faculty of Business',
        label: 'Faculty of Business',
    },
    {
        value: 'Faculty of Humanities and Sciences',
        label: 'Faculty of Humanities and Sciences',
    },
    {
        value: 'School of Architecture',
        label: 'School of Architecture',
    },
    {
        value: 'School of Law',
        label: 'School of Law',
    },
    {
        value: 'School of Hospitality and Culinary',
        label: 'School of Hospitality and Culinary',
    }
];

const centre = [
    {
        value: 'Malabe Center',
        label: 'Malabe Center',
    },
    {
        value: 'Metro Center',
        label: 'Metro Center',
    },
];

const building = [
    {
        value: 'Main Building',
        label: 'Main Building',
    },
    {
        value: 'Business Building',
        label: 'Business Building',
    },
];

const level = [
    {
        value: 1,
        label: 'Professor',
    },
    {
        value: 2,
        label: 'Assistant Professor',
    },
    {
        value: 3,
        label: 'Senior Lecturer(HG)',
    },
    {
        value: 4,
        label: 'Senior Lecturer',
    },
    {
        value: 5,
        label: 'Lecturer',
    },
    {
        value: 6,
        label: 'Assistant Lecturer',
    },
    {
        value: 7,
        label: 'Instructors',
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

export default function LecturerForm() {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="employeeID"
                        name="employeeID"
                        label="Employee ID"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="Faculty"
                        value={currency}
                        onChange={handleChange}
                        variant="filled"
                        fullWidth
                    >
                        {faculities.map((option) => (
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
                        label="Department"
                        value={currency}
                        onChange={handleChange}
                        variant="filled"
                        fullWidth
                    >
                        {departments.map((option) => (
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
                        label="Centre"
                        value={currency}
                        onChange={handleChange}
                        variant="filled"
                        fullWidth
                    >
                        {centre.map((option) => (
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
                        label="Building"
                        value={currency}
                        onChange={handleChange}
                        variant="filled"
                        fullWidth
                    >
                        {building.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="Level"
                        value={currency}
                        onChange={handleChange}
                        variant="filled"
                        fullWidth
                    >
                        {level.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Rank"
                        fullWidth
                        autoComplete="shipping address-line2"
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="I hearby certify that above details are true"
                    />
                </Grid>
            </Grid>

            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    // onClick={}
                    className={classes.button}
                >
                    Next
                </Button>
            </div>
        </React.Fragment>
    );
}
