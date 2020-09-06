import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.info.dark,
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
        minWidth: 700,
    },
});

export default function CustomizedTables() {
    const classes = useStyles();
    const [lecturers, setLecturers] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/lecturers")
            .then((response) => {
                setLecturers(response.data);
                setSearchResults(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const results = lecturers.filter(person =>
            person.fname.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <div>
            <h3 align="center"> Lecturer List </h3>

            <div className="form-group">
                <Link to={"/addLecturer"}>
                    <input type="submit" value="Add Lecturer" className= "btn btn-primary"
                           style={{marginLeft: 10}}/>
                </Link>
                <div style={{width:"25px", display:"inline-block"}} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">First name</StyledTableCell>
                            <StyledTableCell align="right">Last name</StyledTableCell>
                            <StyledTableCell align="right">Employee ID</StyledTableCell>
                            <StyledTableCell align="right">Faculty</StyledTableCell>
                            <StyledTableCell align="right">Department</StyledTableCell>
                            <StyledTableCell align="right">Center</StyledTableCell>
                            <StyledTableCell align="right">Building</StyledTableCell>
                            <StyledTableCell align="right">Level</StyledTableCell>
                            <StyledTableCell align="right">Rank</StyledTableCell>
                            <StyledTableCell align="right">Edit/Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((row) => (
                            <StyledTableRow key={row.fname}>
                                <StyledTableCell component="th" scope="row">
                                    {row.fname}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.lname}</StyledTableCell>
                                <StyledTableCell align="right">{row.empid}</StyledTableCell>
                                <StyledTableCell align="right">{row.faculty}</StyledTableCell>
                                <StyledTableCell align="right">{row.department}</StyledTableCell>
                                <StyledTableCell align="right">{row.center}</StyledTableCell>
                                <StyledTableCell align="right">{row.building1}</StyledTableCell>
                                <StyledTableCell align="right">{row.level1}</StyledTableCell>
                                <StyledTableCell align="right">{row.rank}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {/*<Link to={"/lecturer/edit/" +row._id} className="btn btn-primary"> Edit/Delete </Link>*/}
                                    <Link to={"/lecturer/edit/" +row._id}>
                                        <EditIcon></EditIcon>
                                        <DeleteIcon></DeleteIcon>
                                    </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
