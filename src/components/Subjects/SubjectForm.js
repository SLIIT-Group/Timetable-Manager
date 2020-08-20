import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";

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
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="employeeID"
                        name="employeeID"
                        label="Subject Name"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="employeeID"
                        name="employeeID"
                        label="Subject Code"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Offered Year"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="employeeID"
                        name="employeeID"
                        label="Offered Semester"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="No. of lecture hours"
                        value={currency}
                        onChange={handleChange}
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
                        value={currency}
                        onChange={handleChange}
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
                        label="No of lab hours"
                        value={currency}
                        onChange={handleChange}
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
                        label="No of evaluation hours"
                        value={currency}
                        onChange={handleChange}
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
                >
                    Next
                </Button>
            </div>
        </React.Fragment>
    );
}
