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
import axios from 'axios';
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

  const [dataList, setDataList] = useState([]);

  const deleteData = (id) => {
    axios.get('http://localhost:5000/api/notAvailable/delete/' + id)
        .then((res) => {
          if (res.data == 'Successfully removed') {
            swal("Successful", "Details removed", "success");
          } else {
            swal("Unsuccessful", "Error while deleting details", "error");
          }
        });
  }
  useEffect(() => {
    axios

        .get("http://localhost:5000/api/notAvailable/all")
        .then((res) => {
          setDataList(res.data);
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
              <StyledTableCell align='center'>Type</StyledTableCell>
              <StyledTableCell align='center'>Key</StyledTableCell>
              <StyledTableCell align='center'>Day</StyledTableCell>
              <StyledTableCell align='center'>Start Time</StyledTableCell>
              <StyledTableCell align='center'>End Time</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((item, key) => (
              <TableRow hover key={key}>
                <TableCell align='center'>{item.type}</TableCell>
                <TableCell align='center'>{item.key}</TableCell>
                <TableCell align='center'>{item.day}</TableCell>
                <TableCell align='center'>{item.startTime}</TableCell>
                <TableCell align='center'>{item.endTime}</TableCell>
                <TableCell align='center'>
                  <DeleteIcon onClick={() => deleteData(item._id)}
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
