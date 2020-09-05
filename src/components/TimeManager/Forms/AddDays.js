import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';

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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
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

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function AddDays({ allocations, counter, setCounter }) {
  const classes = useStyles();

  const initialState = { day: '', hours: '' };
  const [allocation, setAllocation] = useState(initialState);
  const [filteredDays, setFilteredDays] = useState([]);

  const addAllocation = () => {
    axios
      .post('http://localhost:5000/api/day', allocation)
      .then((res) => setCounter(counter + 1))
      .catch((err) => console.log(err));
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
  }, [allocations]);

  return (
    <div>
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size='small'
                    id='working-day'
                    select
                    label='Day'
                    name='day'
                    value={allocation.day}
                    onChange={handleChange}
                    variant='filled'
                    fullWidth
                  >
                    {filteredDays.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='hours'
                    name='hours'
                    label='No. of hours'
                    value={allocation.hours}
                    onChange={handleChange}
                    fullWidth
                    type='number'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    size='small'
                    variant='contained'
                    color='primary'
                    width='block'
                    onClick={addAllocation}
                    style={{ marginTop: '10px' }}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      createDaysArray();
                      console.log(
                        days.filter((day) => !addedDays.includes(day.value))
                      );
                    }}
                  ></Button>
                </Grid>
                <Grid item>
                  <p>Table</p>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    </div>
  );
}

export default AddDays;
