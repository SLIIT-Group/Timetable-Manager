import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuidv4 } from 'uuid';

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
  const [days, setDays] = useState([]);

  useEffect(() => {
    getAllAllocations();
  }, [timeError]);

  //Slot types
  const types = ['1-Hour Slot', '1/2-Hour Slot'];

  const handleChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const checkErrors = () => {
    let errorCount = 0;

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

  const generateSlots = (day, start) => {
    let slotsForDay = [];
    let hours = day.hours;
    let startTime = start;
    let startTimeObj = new Date(selectedDate.getTime());
    let endTimeObj = new Date(selectedDate.getTime() + 60 * 60000);

    for (let index = 0; index < hours; index++) {
      let tempSlot = {
        _id: uuidv4(),
        start: startTimeObj.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        end: endTimeObj.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        day: day.day,
      };
      slotsForDay.push(tempSlot);
      startTimeObj = endTimeObj;
      endTimeObj = new Date(endTimeObj.getTime() + 60 * 60000);
    }
    return slotsForDay;
  };

  const getAllAllocations = () => {
    axios
      .get(`http://localhost:5000/api/day`)
      .then((res) => {
        console.log('------------------');
        console.log(res.data);
        setDays(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  //UPDATE
  const updateDay = (id, slots) => {
    axios
      .patch(`http://localhost:5000/api/day/${id}`, slots)
      .then((res) => {
        setCounter(counter + 1);
      })
      .catch((err) => console.log(err));
  };

  // Handle Add button
  const Add = () => {
    let errCount = checkErrors();

    if (errCount === 0) {
      let startTimeString = selectedDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      days.map((day) => {
        let slotsForDay = generateSlots(day, startTimeString);
        updateDay(day._id, slotsForDay);
      });
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
