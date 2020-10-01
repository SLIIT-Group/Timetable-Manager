import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import swal from 'sweetalert';
import Timetable from '../Tables/Timetable';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '10px',
    marginRight: '10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

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

function LecturerTimetablePanel({ counter, setCounter }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const initialState = [{ allocations: [{ session: {}, slots: [], day: '' }] }];
  const [lecturers, setLecturers] = useState([]);

  const getLecturers = () => {
    axios
      .get('http://localhost:5000/api/lecturers')
      .then((response) => {
        console.log(response.data);
        setLecturers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getLecturers();
  }, [counter]);

  const deleteTimetable = (id) => {
    axios
      .delete(`http://localhost:5000/api/timetable/${id}`)
      .then(() => {
        swal('Successful', `Timetable deleted`, 'success');
        setCounter(counter + 1);
      })
      .catch((err) => console.log('Error', err));
  };

  return (
    <div className={classes.root}>
      <Container>
        <Accordion
          style={
            expanded
              ? { backgroundColor: '#f5f5f5' }
              : { backgroundColor: '#3f51b5', color: '#fff' }
          }
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography className={classes.heading}>
              View Timetables by Lecturer
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                  <div>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label='simple table'
                      >
                        <TableHead
                          key={1}
                          style={{
                            backgroundColor: 'theme.palette.common.black',
                            color: 'theme.palette.common.white',
                          }}
                        >
                          <TableRow align='center'>
                            <StyledTableCell align='center'>
                              Lecturer ID
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              Lecturer
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              View
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lecturers.map((row) => (
                            <TableRow key={row._id} hover>
                              <TableCell align='center'>{row.empid}</TableCell>
                              <TableCell align='center'>
                                {row.fname + ' ' + row.lname}
                              </TableCell>
                              <TableCell align='center'>
                                <Link
                                  to={
                                    '/timetables/lecturer/' +
                                    row.fname +
                                    ' ' +
                                    row.lname
                                  }
                                >
                                  <VisibilityIcon></VisibilityIcon>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default LecturerTimetablePanel;
