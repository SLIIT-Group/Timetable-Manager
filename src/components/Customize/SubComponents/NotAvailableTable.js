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
import {Link} from "react-router-dom";
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

function NotAvailableTable() {
  const classes = useStyles();

  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const deleteData = (id) => {
    axios.get('https://kaalaapi.herokuapp.com/api/notAvailable/delete/' + id)
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

        .get("https://kaalaapi.herokuapp.com/api/notAvailable/all")
        .then((res) => {
          setDataList(res.data);
          setSearchResults(res.data);
        });

  },[]);

  useEffect(() => {

    const results = dataList.filter(dataList =>
        dataList.key.toLowerCase().includes(searchTerm)
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
                  <StyledTableCell align='center'>Type</StyledTableCell>
                  <StyledTableCell align='center'>Key</StyledTableCell>
                  <StyledTableCell align='center'>Slot</StyledTableCell>
                  <StyledTableCell align='center'>Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((item, key) => (
                    <TableRow hover key={key}>
                      <TableCell align='center'>{item.type}</TableCell>
                      <TableCell align='center'>{item.key}</TableCell>
                      <TableCell align='center'>{item.slot && item.slot.day} {item.slot && item.slot.start} - {item.slot && item.slot.end}</TableCell>
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

export default NotAvailableTable;
