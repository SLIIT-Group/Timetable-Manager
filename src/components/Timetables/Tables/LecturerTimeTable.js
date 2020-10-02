import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Button, colors } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 11,
    maxWidth: '5px',
  },
}))(TableCell);

const navStyle = {
  color: '#fff',
  textDecoration: 'none',
};

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

function LecturerTimeTable(props) {
  const classes = useStyles();

  const [timetable, setTimetable] = useState([
    { allocations: [{ day: '', session: {} }], groupID: '' },
  ]);
  const getTimetable = () => {
    axios
      .get(
        `http://localhost:5000/api/timetable/lecturer/${props.match.params.id}`
      )
      .then((response) => {
        console.log(response.data);
        setTimetable(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getBackgroundColor = (tag) => {
    switch (tag) {
      case 'Lecture':
        return { backgroundColor: '#ede6ff' };
        break;
      case 'Tutorial':
        return { backgroundColor: '#fceac5' };
        break;
      case 'Lab':
        return { backgroundColor: '#cce3ff' };
        break;

      default:
        return { backgroundColor: '#fff' };
        break;
    }
  };

  useEffect(() => {
    getTimetable();
  }, []);
  return (
    <Grid item>
      <Link style={navStyle} to='/timetables'>
        <div style={{ marginTop: -30, marginLeft: 20 }}>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
          >
            Back
          </Button>
        </div>
      </Link>
      <h6 style={{ marginLeft: '300px' }}>Lecturer {props.match.params.id}</h6>
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
            {timetable.map((alloc) => (
              <TableRow style={{ padding: 0 }} hover>
                <TableCell align='center'>
                  {alloc.day === 'Monday' ? (
                    <div style={getBackgroundColor(alloc.session.tag)}>
                      <b>
                        {alloc.session.subject + '\n'}
                        {alloc.session.tag}
                      </b>
                      <br></br>
                      {alloc.room}
                      <br></br>
                      {props.match.params.id}
                      <p>
                        <b>
                          {alloc.slots[0].start +
                            '-' +
                            alloc.slots[alloc.slots.length - 1].end}
                        </b>
                      </p>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {alloc.day === 'Tuesday' ? (
                    <div style={getBackgroundColor(alloc.session.tag)}>
                      <b>
                        {alloc.session.subject + '\n'}
                        {alloc.session.tag}
                      </b>
                      <br></br>
                      {alloc.room}
                      <br></br>
                      {props.match.params.id}
                      <b>
                        {alloc.slots[0].start +
                          '-' +
                          alloc.slots[alloc.slots.length - 1].end}
                      </b>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {alloc.day === 'Wednesday' ? (
                    <div style={getBackgroundColor(alloc.session.tag)}>
                      <b>
                        {alloc.session.subject + '\n'}
                        {alloc.session.tag}
                      </b>
                      <br></br>
                      {alloc.room}
                      <br></br>
                      {props.match.params.id}
                      <br></br>
                      <b>
                        {alloc.slots[0].start +
                          '-' +
                          alloc.slots[alloc.slots.length - 1].end}
                      </b>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {alloc.day === 'Thursday' ? (
                    <div style={getBackgroundColor(alloc.session.tag)}>
                      <b>
                        {alloc.session.subject + '\n'}
                        {alloc.session.tag}
                      </b>
                      <br></br>
                      {alloc.room}
                      <br></br>
                      {props.match.params.id}
                      <p>
                        <b>
                          {alloc.slots[0].start +
                            '-' +
                            alloc.slots[alloc.slots.length - 1].end}
                        </b>
                      </p>
                    </div>
                  ) : (
                    <p>---</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {alloc.day === 'Friday' ? (
                    <div style={getBackgroundColor(alloc.session.tag)}>
                      <b>
                        {alloc.session.subject + '\n'}
                        {alloc.session.tag}
                      </b>
                      <br></br>
                      {alloc.room}
                      <br></br>
                      {props.match.params.id}
                      <p>
                        <b>
                          {alloc.slots[0].start +
                            '-' +
                            alloc.slots[alloc.slots.length - 1].end}
                        </b>
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

export default LecturerTimeTable;
