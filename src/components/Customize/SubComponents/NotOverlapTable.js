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
import {Col} from "reactstrap";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {Link} from "react-router-dom";

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

function NotOverlapTable() {
  const classes = useStyles();

  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const deleteData = (id) => {
    axios.get('https://kaalaapi.herokuapp.com/api/nos/delete/' + id)
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

        .get("https://kaalaapi.herokuapp.com/api/nos/all")
        .then((res) => {
          setDataList(res.data);
          setSearchResults(res.data);
        });

  },[]);

  useEffect(() => {

      const results = dataList.filter(dataList =>
          dataList.no1.subject.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);

  }, [searchTerm]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
      <div>
        <div className="form-group">

          <div className="row col-md-12">
            <Col sm="6 pb-0 text-left">
              <Link to={"/addNotOverlap"}>
                <input type="submit" value="Add Not Overlap Sessions" className= "btn btn-primary"/>
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
                    placeholder="Search"
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
                      <StyledTableCell align='center'>Not Overlap Session 1</StyledTableCell>
                      <StyledTableCell align='center'>Not Overlap Session 2</StyledTableCell>
                      <StyledTableCell align='center'>Not Overlap Session 3</StyledTableCell>
                      <StyledTableCell align='center'>Delete</StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {searchResults.map((item, key) => (
                      <TableRow hover key={key}>
                          <TableCell align='center'>
                              {item.no1.subject} {item.no1.subjectCode}<br/>
                              {item.no1.tag}<br/>
                              {item.no1.groupId}
                          </TableCell>
                          <TableCell align='center'>
                              {item.no2.subject} {item.no2.subjectCode}<br/>
                              {item.no2.tag}<br/>
                              {item.no2.groupId}
                          </TableCell>
                          <TableCell align='center'>
                              {item.no3.subject} {item.no3.subjectCode}<br/>
                              {item.no3.tag}<br/>
                              {item.no3.groupId}
                          </TableCell>
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
      </div>
  );
}

export default NotOverlapTable;
