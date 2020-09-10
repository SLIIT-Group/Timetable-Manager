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

function Add({ counter, setCounter }) {
  const classes = useStyles();
  const initialState = { start: '', end: '', duration: '' };
  const [slot, setSlot] = useState(initialState);

  //Slot types
  const types = ['1-Hour Slot', '1/2-Hour Slot'];

  const handleChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const calcEndTime = (duration, start) => {
    switch (duration) {
      case '1-Hour Slot':
        let hourTime = start.split('.');
        let endHour = parseInt(hourTime[0]) + 1;
        let endMins = '';
        hourTime.length >= 2 ? (endMins = hourTime[1]) : (endMins = '00');
        return endHour + ':' + endMins;

        break;

      default:
        let time = start.split('.');
        if (time.length >= 2) {
          let startHour = time[0];
          let startMins = time[1];
          let endMins = parseInt(startMins) + 30;

          if (endMins >= 60) {
            let endHour = parseInt(startHour) + 1;
            endMins -= 60;
            endMins === 0 ? (endMins = '00') : endMins;
            return endHour + ':' + endMins;
          } else {
            let endHour = startHour;
            let endMins = parseInt(startMins) + 30;
            return endHour + ':' + endMins;
          }
        } else {
          let startHour = time[0];
          return startHour + ':' + '30';
        }
    }
  };

  const post = (s) => {
    axios
      .post('http://localhost:5000/api/slot', s)
      .then(() => {
        setCounter(counter + 1);
        console.log(s);
      })
      .catch((err) => console.log(s));
  };

  const Add = () => {
    console.log(calcEndTime(slot.duration, slot.start));
    let end = calcEndTime(slot.duration, slot.start);
    const s = { start: slot.start, end: end, duration: slot.duration };
    post(s);
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        size='small'
        id='slot'
        select
        label='Type'
        name='duration'
        value={slot.duration}
        onChange={handleChange}
        fullWidth
      >
        {types.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Grid item xs={12}>
        <TextField
          required
          id='start'
          size='small'
          name='start'
          label='Start Time'
          value={slot.start}
          onChange={handleChange}
          type='number'
        />
      </Grid>

      <Button
        style={buttonStyle}
        value='Add'
        variant='contained'
        color='primary'
        width='block'
        onClick={Add}
      >
        Add
      </Button>
      {/* </Grid> */}
    </form>
  );
}

const buttonStyle = {
  margin: '20px',

  // marginLeft: '30px',
  width: '70%',
};

export default Add;
