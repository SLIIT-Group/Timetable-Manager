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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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
    const [subjects, setSubjects] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        axios.get("https://kaalaapi.herokuapp.com/api/subjects")
            .then((response) => {
                setSubjects(response.data);
                setSearchResults(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const results = subjects.filter(person =>
            person.subName.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <div>
            <h3 align="center"> Subjects List </h3>

            <div className="form-group">
                <Link to={"/addSubject"}>
                    <input type="submit" value="Add Subject" className= "btn btn-primary"
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
                            <StyledTableCell align="right">Subject name</StyledTableCell>
                            <StyledTableCell align="right">Subject code</StyledTableCell>
                            <StyledTableCell align="right">Offered year</StyledTableCell>
                            <StyledTableCell align="right">Offered semester</StyledTableCell>
                            <StyledTableCell align="right">Lecture hours</StyledTableCell>
                            <StyledTableCell align="right">Tute hours</StyledTableCell>
                            <StyledTableCell align="right">Lab hours</StyledTableCell>
                            <StyledTableCell align="right">Evaluation hours</StyledTableCell>
                            <StyledTableCell align="right">Edit/Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((row) => (
                            <StyledTableRow key={row.subName}>
                                <StyledTableCell component="th" scope="row">
                                    {row.subName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.subCode}</StyledTableCell>
                                <StyledTableCell align="right">{row.offeredYear}</StyledTableCell>
                                <StyledTableCell align="right">{row.offeredSemester}</StyledTableCell>
                                <StyledTableCell align="right">{row.lecHo}</StyledTableCell>
                                <StyledTableCell align="right">{row.tuteHo}</StyledTableCell>
                                <StyledTableCell align="right">{row.labHo}</StyledTableCell>
                                <StyledTableCell align="right">{row.evaHo}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {/*<Link to={"/subject/edit/" +row._id} className="btn btn-primary"> Edit/Delete </Link>*/}
                                    <Link to={"/subject/edit/" +row._id}>
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
