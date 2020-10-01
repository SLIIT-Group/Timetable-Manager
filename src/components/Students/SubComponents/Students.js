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
import {Link, Link as ReactLink} from "react-router-dom";
import swal from "sweetalert";
import Col from "react-bootstrap/Col";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const deleteStudent = (id) => {
    axios.get('https://kaalaapi.herokuapp.com/api/students/delete/' + id)
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
        .get("https://kaalaapi.herokuapp.com/api/students/all")
        .then((res) => {
          setDataList(res.data);
          setSearchResults(res.data);
        });
  },[]);

  useEffect(() => {

    const results = dataList.filter(dataList =>
    (dataList.academicYrSem+"."+dataList.programme+"."+dataList.grpNo+"."+dataList.subGrpNo).includes(searchTerm)
    );
    setSearchResults(results);

  }, [searchTerm]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };


  return (
    <div>
      <div className="form-group row col-md-12 d-flex bd-highlight mx-5 px-5">

        <Col className="d-flex justify-content-start col s6">
          <Link to={"/addStudent"}>
            <input type="submit" value="Add Student Record" className= "btn btn-primary"/>
          </Link>
        </Col>
        <div className="input-field col s6 d-flex flex-column">
          <Paper
              component="form"
              className={classes.root}
              style={{
                justifyContent: "center",
                borderRadius: 20,
                textAlign: "center",
                borderBottom: "2px solid #EC4C90",
                maxWidth: 500,
                display: "flex",
                flexDirection: "row",
                align: "space-between",
                paddingLeft: 25,
              }}
          >
            <InputBase
                className={classes.input}
                placeholder="Search Key"
                value={searchTerm}
                onChange={handleChange}
                style={{ flex: 1 }}
            />
            <IconButton
                className={classes.iconButton}
                aria-label="search"
            >
              <SearchIcon disabled style={{ flex: 1 }} />
            </IconButton>
          </Paper>
        </div>
      </div>


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
            {searchResults.map((item, key) => (
              <TableRow hover key={key}>
                <TableCell align='center'>{item.academicYrSem}</TableCell>
                <TableCell align='center'>{item.programme}</TableCell>
                <TableCell align='center'>{item.grpNo}</TableCell>
                <TableCell align='center'>{item.academicYrSem+"."+item.programme+"."+item.grpNo}</TableCell>
                <TableCell align='center'>{item.subGrpNo}</TableCell>
                <TableCell align='center'>{item.academicYrSem+"."+item.programme+"."+item.grpNo+"."+item.subGrpNo}</TableCell>
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
    </div>
  );
}

export default Students;
