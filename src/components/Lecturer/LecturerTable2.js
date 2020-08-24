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

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables() {
    const classes = useStyles();
    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
        // axios.get("http://localhost:5000/api/lecturers")
        //     .then((response) => {
        //         const arr = response.data;
        //         console.log(arr);
        //         setLecturers([response.data]);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // console.log('variable' +lecturers)

        fetch(`http://localhost:5000/api/lecturers/`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setLecturers(result);
                },
                (error) => {
                    console.log(error);
                    //setError(error);
                }
            );


    }, []);

    return (
        <div>
            <h3 align="center"> Lecturer List </h3>
            <Link to={"/addLecturer"} className="btn btn-primary">
                Add Lecturer
            </Link>

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
                        {lecturers.map((row) => (
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
                                    <Link to={"/edit/" +row._id} className="btn btn-primary"> Edit/Delete </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
