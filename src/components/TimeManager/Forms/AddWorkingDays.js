import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

const days = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '7',
    label: '7',
  },
];
// const days = [
//   {
//     value: 'Monday',
//     label: 'Monday',
//   },
//   {
//     value: 'Tuesday',
//     label: 'Tuesday',
//   },
//   {
//     value: 'Wednesday',
//     label: 'Wednesday',
//   },
//   {
//     value: 'Thursday',
//     label: 'Thursday',
//   },
//   {
//     value: 'Friday',
//     label: 'Friday',
//   },
//   {
//     value: 'Saturday',
//     label: 'Saturday',
//   },
//   {
//     value: 'Sunday',
//     label: 'Sunday',
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function AddWorkingDays() {
  const classes = useStyles();
  const [day, setDay] = React.useState('5');
  const [toggle, setToggle] = React.useState({
    value: 'EDIT',
    isEdit: true,
  });

  const onClick = (e) => {
    if (toggle.value === 'EDIT') {
      setToggle({
        value: 'SAVE',
        isEdit: false,
      });
    } else {
      setToggle({
        value: 'EDIT',
        isEdit: true,
      });
    }
  };

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          id='outlined-select-currency'
          select
          label='Select'
          value={day}
          onChange={handleChange}
          helperText='Please select number of days'
          variant='outlined'
        >
          {days.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <Button
        onClick={onClick}
        style={{ float: 'right' }}
        variant='contained'
        color='primary'
      >
        {toggle.value}
      </Button>
    </form>
  );
}

export default AddWorkingDays;
