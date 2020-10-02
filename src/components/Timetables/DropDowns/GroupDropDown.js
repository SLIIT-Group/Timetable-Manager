import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const groups = ['Y1S2.IT.01'];

export default function GroupDropDown({ groupId, setGroupId }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setGroupId(event.target.value);
  };

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students/all').then((res) => {
      setGroups(res.data);
    });
  }, []);

  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-simple-select-outlined-label'>Group</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={groupId}
          onChange={handleChange}
          label='Group'
        >
          <MenuItem value='Y1S2.IT.01'>Y1S2.IT.01</MenuItem>
          {groups.map((option) => (
            <MenuItem
              key={option._id}
              value={
                option.academicYrSem +
                '.' +
                option.programme +
                '.' +
                option.grpNo
              }
            >
              {option.academicYrSem +
                '.' +
                option.programme +
                '.' +
                option.grpNo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
