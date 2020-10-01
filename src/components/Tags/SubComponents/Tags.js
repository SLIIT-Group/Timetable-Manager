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

function Tags({expanded}) {
  const classes = useStyles();


  const [tagList, setTagList] = useState([]);


  const deleteTag = (tag) => {
    axios
        .get(
            `https://kaalaapi.herokuapp.com/api/tags/delete/`+ tag
        )
        .then((res) => {
          swal("Successful","Tag Deleted Successfully","success");
          axios
              .get("https://kaalaapi.herokuapp.com/api/tags/all")
              .then((res) => {
                setTagList(res.data);
              });
        })
        .catch((err) => swal("Unsuccessful","Tag Deletion Failed", "error"));

  }
  useEffect(() => {
    axios
        .get("https://kaalaapi.herokuapp.com/api/tags/all")
        .then((res) => {
          setTagList(res.data);
        });

  },[expanded]);


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
              <StyledTableCell align='center'>Tag Name</StyledTableCell>
              <StyledTableCell align='center'>Update</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tagList.map((item, key) => (
              <TableRow hover key={key}>
                <TableCell align='center'>{item.tag}</TableCell>
                <TableCell align='center'>
                  {' '}
                  <ReactLink to={"/tags/edit/" +item._id}>
                  <EditIcon
                  >
                    Edit
                  </EditIcon>
                  </ReactLink>
                </TableCell>
                <TableCell align='center'>
                  <DeleteIcon onClick={() => deleteTag(item.tag)}
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

export default Tags;
