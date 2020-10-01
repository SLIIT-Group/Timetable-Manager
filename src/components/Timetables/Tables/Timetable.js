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
    fontSize: 11,
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
    margin: '10px',
  },
});

function Timetable({ allocations }) {
  const classes = useStyles();

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
              <StyledTableCell align='center'>Monday</StyledTableCell>
              <StyledTableCell align='center'>Tuesday</StyledTableCell>
              <StyledTableCell align='center'>Wednesday</StyledTableCell>
              <StyledTableCell align='center'>Thursday</StyledTableCell>
              <StyledTableCell align='center'>Friday</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allocations.map((alloc) => (
              <TableRow
                style={{ padding: 0 }}
                key={alloc.session.groupID}
                hover
              >
                <TableCell align='center'>
                  {alloc.day === 'Monday' ? (
                    <div style={{ backgroundColor: 'pink' }}>
                      {alloc.session.subject + '\n'}
                      {alloc.session.tag}
                      <p>{alloc.session.rooms[0]}</p>
                      <p>{alloc.session.lecturers[0]}</p>
                      <p>
                        {alloc.slots[0].start +
                          '-' +
                          alloc.slots[alloc.slots.length - 1].end}
                      </p>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {alloc.day === 'Tuesday' ? (
                    <div style={{ backgroundColor: 'pink' }}>
                      {alloc.session.subject + '\n'}
                      {alloc.session.tag}
                      <p>{alloc.session.rooms[0]}</p>
                      <p>{alloc.session.lecturers[0]}</p>
                      <p>
                        {alloc.slots[0].start +
                          '-' +
                          alloc.slots[alloc.slots.length - 1].end}
                      </p>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {alloc.day === 'Wednesday' ? (
                    <div style={{ backgroundColor: 'yellow' }}>
                      {alloc.session.subject + '\n'}
                      {alloc.session.tag}
                      <p>{alloc.session.rooms[0]}</p>
                      <p>{alloc.session.lecturers[0]}</p>
                      <p>
                        {alloc.slots[0].start +
                          '-' +
                          alloc.slots[alloc.slots.length - 1].end}
                      </p>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {alloc.day === 'Thursday' ? (
                    <div style={{ backgroundColor: 'pink' }}>
                      {alloc.session.subject + '\n'}
                      {alloc.session.tag}
                      <p>{alloc.session.rooms[0]}</p>
                      <p>{alloc.session.lecturers[0]}</p>
                      <p>
                        {alloc.slots[0].start +
                          '-' +
                          alloc.slots[alloc.slots.length - 1].end}
                      </p>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {alloc.day === 'Friday' ? (
                    <div style={{ backgroundColor: 'pink' }}>
                      {alloc.session.subject + '\n'}
                      {alloc.session.tag}
                      <p>{alloc.session.rooms[0]}</p>
                      <p>{alloc.session.lecturers[0]}</p>
                      <p>
                        {alloc.slots[0].start +
                          '-' +
                          alloc.slots[alloc.slots.length - 1].end}
                      </p>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Timetable;
