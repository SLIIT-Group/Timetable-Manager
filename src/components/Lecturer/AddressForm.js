import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
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
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                    />
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
                        {currencies.map((option) => (
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
                        label="Faculty"
                        value={currency}
                        onChange={handleChange}
                        variant="filled"
                        fullWidth
                    >
                        {currencies.map((option) => (
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
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/*<TextField*/}
                    {/*    required*/}
                    {/*    id="country"*/}
                    {/*    name="country"*/}
                    {/*    label="Country"*/}
                    {/*    fullWidth*/}
                    {/*    autoComplete="shipping country"*/}
                    {/*/>*/}
                    <TextField
                        id="filled-select-currency"
                        select
                        label="Building"
                        value={currency}
                        onChange={handleChange}
                        variant="filled"
                        fullWidth
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="I hearby certify that above details are true"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
