import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib

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
  const [selectedDate, handleDateChange] = useState();
  const [slotTypeError, setSlotTypeError] = useState('');
  const [timeError, setTimeError] = useState('');

  useEffect(() => {
    console.log('fired');
  }, [timeError]);

  //Slot types
  const types = ['1-Hour Slot', '1/2-Hour Slot'];

  const handleChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const checkErrors = () => {
    let errorCount = 0;

    console.log(selectedDate);

    if (slot.duration === '' || slot.duration === null) {
      setSlotTypeError('Please select a valid type');
      errorCount += 1;
    } else {
      setSlotTypeError('');
    }
    if (selectedDate === null) {
      setTimeError('Please select a valid time');
      errorCount += 1;
    } else {
      setTimeError('');
    }
    return errorCount;
  };

  const calcEndTime = (duration) => {
    switch (duration) {
      case '1-Hour Slot':
        let endTimeObj1 = new Date(selectedDate.getTime() + 60 * 60000);
        let endTimeString1 = endTimeObj1.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        return endTimeString1;
        break;

      default:
        let endTimeObj2 = new Date(selectedDate.getTime() + 30 * 60000);
        let endTimeString2 = endTimeObj2.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        return endTimeString2;
    }
  };
  // POST
  const post = (s) => {
    axios
      .post('http://localhost:5000/api/slot', s)
      .then(() => {
        setCounter(counter + 1);
        console.log(s);
      })
      .catch((err) => console.log(s));
  };

  // Handle Add button
  const Add = () => {
    let errCount = checkErrors();

    if (errCount === 0) {
      let startTimeString = selectedDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      let endTimeString = calcEndTime(slot.duration);
      const s = {
        start: startTimeString,
        end: endTimeString,
        duration: slot.duration,
      };

      post(s);
    } else {
      console.log(errCount);
    }
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
      {slotTypeError !== '' && <p style={errorStyle}>{slotTypeError}</p>}
      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            clearable
            // ampm={false}
            label='Start time'
            value={selectedDate}
            onChange={handleDateChange}
            autoOk
          />
        </MuiPickersUtilsProvider>
        {timeError && <p style={errorStyle}>{timeError}</p>}
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
