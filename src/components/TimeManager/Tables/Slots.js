import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 150,
    padding: 0,
  },
});

function Slots({ slots, setCounter, counter }) {
  const classes = useStyles();

  const deleteSlot = (id) => {
    axios
      .delete(`http://localhost:5000/api/slot/${id}`)
      .then(() => {
        console.log('Slot deleted');
        setCounter(counter + 1);
      })
      .catch((err) => console.log('Error', err));
  };

  const getSlotString = (day) => {
    let slotString = '';
    day.slots.map((slot) => {
      slotString += 'Start: ' + slot.start + ' End: ' + slot.end + '\n';
    });
    return slotString;
  };

  return (
    <Grid item>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead
            style={{
              backgroundColor: 'theme.palette.common.black',
              color: 'theme.palette.common.white',
            }}
          >
            <TableRow align='center'>
              <StyledTableCell align='center'>Type</StyledTableCell>
              <StyledTableCell align='center'>Start</StyledTableCell>
              <StyledTableCell align='center'>End</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slots.map((row) => (
              <TableRow hover key={row._id}>
                <TableCell align='center'>{row.day}</TableCell>
                <TableCell align='center'>
                  {row.slots.map((slot) => {
                    return <div>{`Start ${slot.start} End ${slot.end}`}</div>;
                  })}
                </TableCell>

                <TableCell align='center'>
                  <DeleteIcon
                    onClick={() => {
                      deleteSlot(row._id);
                    }}
                  >
                    {' '}
                  </DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableBody>
        </TableBody> */}
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Slots;
