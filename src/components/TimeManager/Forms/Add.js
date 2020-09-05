import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      padding: '20px',
      width: '80%',
    },
  },
}));

function Add() {
  const classes = useStyles();
  const [allocations, setallocations] = useState();
  const [loading, isLoading] = useState(true);

  const getAllAllocations = () => {
    console.log('clicked');
    axios
      .get(`http://localhost:5000/api/day`)
      .then((res) => {
        console.log(res.data);
        setallocations(res.data);
        isLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllAllocations();
  }, []);
  //Days
  const days = [
    {
      id: 1,
      value: 'Monday',
      label: 'Monday',
    },
    {
      id: 2,
      value: 'Tuesday',
      label: 'Tuesday',
    },
    {
      id: 3,
      value: 'Wednesday',
      label: 'Wednesday',
    },
    {
      id: 4,
      value: 'Thursday',
      label: 'Thursday',
    },
    {
      id: 5,
      value: 'Friday',
      label: 'Friday',
    },
    {
      id: 6,
      value: 'Saturday',
      label: 'Saturday',
    },
    {
      id: 7,
      value: 'Sunday',
      label: 'Sunday',
    },
  ];

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Grid item sm={12}>
        <TextField
          select
          label='Day'
          name='day'
          id='standard-size-small'
          defaultValue='Tuesday'
        >
          {loading ? (
            <MenuItem>Loading</MenuItem>
          ) : (
            allocations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          )}
        </TextField>
      </Grid>
      <Grid item sm={12}>
        <TextField id='standard-size-small' defaultValue='Small' size='small' />
      </Grid>
      <Grid item sm={12}>
        <Button
          style={buttonStyle}
          value='Add'
          variant='contained'
          color='primary'
          width='block'
          onClick={getAllAllocations}
        >
          Add
        </Button>
      </Grid>
    </form>
  );
}

const buttonStyle = {
  margin: '20px',
  alignContent: 'flex-end',
};

export default Add;
