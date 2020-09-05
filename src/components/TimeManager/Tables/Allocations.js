import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 150,
    padding: 0,
  },
});

function Allocations({
  allocations,
  setCounter,
  counter,
  setIsEditing,
  setEditingAllocation,
}) {
  const classes = useStyles();

  const deleteAllocation = (id) => {
    axios
      .delete(`http://localhost:5000/api/day/${id}`)
      .then(() => {
        console.log('Item deleted');
        setCounter(counter + 1);
      })
      .catch((err) => console.log('Error', err));
  };

  return (
    <Grid item>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow align='center'>
              <TableCell align='center'>Day</TableCell>
              <TableCell align='center'>Hours</TableCell>
              <TableCell align='center'>Delete</TableCell>
              <TableCell align='center'>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allocations.map((row) => (
              <TableRow hover key={row._id}>
                <TableCell align='center'>{row.day}</TableCell>
                <TableCell align='center'>{row.hours}</TableCell>
                <TableCell align='center'>
                  <Button
                    onClick={() => {
                      deleteAllocation(row._id);
                    }}
                  >
                    X
                  </Button>
                </TableCell>
                <TableCell align='center'>
                  {' '}
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                      setEditingAllocation(row);
                      console.log(row);
                    }}
                  >
                    Edit
                  </Button>
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

export default Allocations;
