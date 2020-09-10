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
import {Link as ReactLink} from "react-router-dom";
import swal from "sweetalert";

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

function Students() {
  const classes = useStyles();

  const [studentList, setStudentList] = useState([]);

  const deleteStudent = (id) => {
    axios.get('http://localhost:5000/api/students/delete/' + id)
        .then((res) => {
          if (res.data == 'Successfully removed') {
            swal("Successful", "Student details removed", "success");
          } else {
            swal("Unsuccessful", "Error while deleting details", "error");
          }
        });
  }
  useEffect(() => {
    axios

        .get("http://localhost:5000/api/students/all")
        .then((res) => {
          setStudentList(res.data);
        });

  });


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
              <StyledTableCell align='center'>Academic Yr and Sem</StyledTableCell>
              <StyledTableCell align='center'>Programme</StyledTableCell>
              <StyledTableCell align='center'>Group Number</StyledTableCell>
              <StyledTableCell align='center'>Group ID</StyledTableCell>
              <StyledTableCell align='center'>Sub Group Number</StyledTableCell>
              <StyledTableCell align='center'>Sub Group ID</StyledTableCell>
              <StyledTableCell align='center'>Update</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((item, key) => (
              <TableRow hover key={key}>
                <TableCell align='center'>{item.academicYrSem}</TableCell>
                <TableCell align='center'>{item.programme}</TableCell>
                <TableCell align='center'>{item.grpNo}</TableCell>
                <TableCell align='center'>{item.grpID}</TableCell>
                <TableCell align='center'>{item.subGrpNo}</TableCell>
                <TableCell align='center'>{item.subGrpID}</TableCell>
                <TableCell align='center'>
                  {' '}
                  <ReactLink to={"/student/edit/" +item._id}>
                  <EditIcon
                  >
                    Edit
                  </EditIcon>
                  </ReactLink>
                </TableCell>
                <TableCell align='center'>
                  <DeleteIcon onClick={() => deleteStudent(item._id)}
                  >
                    {' '}
                  </DeleteIcon>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Students;
