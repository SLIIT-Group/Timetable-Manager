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
      marginLeft: '20px',
    },
  },
}));

function Add({ allocations, counter, setCounter }) {
  const classes = useStyles();

  const initialState = { day: '', hours: '' };
  const [allocation, setAllocation] = useState(initialState);
  const [filteredDays, setFilteredDays] = useState([]);
  const [dayError, setDayError] = useState('');
  const [hourError, setHourError] = useState('');

  const checkErrors = () => {
    let errorCount = 0;

    if (allocation.day === '' || allocation.day === null) {
      setDayError('Please select a valid day');
      errorCount += 1;
    } else {
      setDayError('');
    }
    if (
      allocation.hours === '' ||
      allocation.hours === null ||
      allocation.hours <= 0
    ) {
      setHourError('Please select a valid time');
      errorCount += 1;
    } else {
      setHourError('');
    }
    return errorCount;
  };

  const addAllocation = () => {
    checkErrors();
    if (checkErrors() === 0) {
      console.log(allocation);
      console.log('Posted');
      axios
        .post('https://kaalaapi.herokuapp.com/api/day', allocation)
        .then(() => setCounter(counter + 1))
        .catch((err) => console.log(err));
      setAllocation(initialState);
    } else {
    }
  };

  const handleChange = (e) => {
    setAllocation({
      ...allocation,
      [e.target.name]: e.target.value,
    });
  };

  let addedDays = [];
  const createDaysArray = () => {
    addedDays = [];
    allocations.map((alloc) => {
      addedDays.push(alloc.day);
    });
  };

  useEffect(() => {
    createDaysArray();
    setFilteredDays(days.filter((day) => !addedDays.includes(day.value)));
  }, [hourError, dayError, allocations]);
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
      <TextField
        size='small'
        id='working-day'
        select
        label='Day'
        name='day'
        value={allocation.day}
        onChange={handleChange}
        fullWidth
      >
        {filteredDays.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {dayError && <p style={errorStyle}>{dayError}</p>}
      <Grid item xs={12}>
        <TextField
          required
          id='standard-size-small'
          size='small'
          name='hours'
          label='No. of hours'
          value={allocation.hours}
          onChange={handleChange}
          type='number'
        />
        {hourError && <p style={errorStyle}>{hourError}</p>}
      </Grid>

      <Button
        style={buttonStyle}
        value='Add'
        variant='contained'
        color='primary'
        width='block'
        onClick={addAllocation}
      >
        Add
      </Button>
    </form>
  );
}

const buttonStyle = {
  margin: '20px',
  width: '70%',
};

const errorStyle = {
  color: '#db7f79',
  marginLeft: '40px',
  marginTop: 0,
  fontSize: '12px',
};

export default Add;
