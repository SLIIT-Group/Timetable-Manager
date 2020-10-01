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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";

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
        minWidth: 700
    },
});

export default function CustomizedTables() {
    const classes = useStyles();
    const [sessions, setSessions] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [value, setValue] = React.useState('lecturer');

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleRadioButtonChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        axios.get("https://kaalaapi.herokuapp.com/api/sessions")
            .then((response) => {
                setSessions(response.data);
                setSearchResults(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if(value == 'lecturer'){
            const results = sessions.filter(session =>
                session.lecturers[0].toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        }
        if(value == 'subject'){
            const results = sessions.filter(session =>
                session.subject.toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        }
        if(value == 'tag'){
            const results = sessions.filter(session =>
                session.tag.toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        }
    }, [searchTerm]);

    return (
        <div>
            <h3 align="center"> Sessions List </h3>

            <div className="form-group">
                <Link to={"/addSession"}>
                    <input type="submit" value="Add Session" className= "btn btn-primary"
                           style={{marginLeft: 10}}/>
                </Link>

                <div style={{width:"25px", display:"inline-block"}} />

                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />

                <div style={{width:"25px", display:"inline-block"}} />

                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleRadioButtonChange} row>
                        <FormControlLabel value="lecturer" control={<Radio />} label="Lecturer" />
                        <FormControlLabel value="subject" control={<Radio />} label="Subject" />
                        <FormControlLabel value="tag" control={<Radio />} label="Tag" />
                    </RadioGroup>
                </FormControl>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Lecturer 1</StyledTableCell>
                            <StyledTableCell align="right">Lecturer 2</StyledTableCell>
                            <StyledTableCell align="right">Lecturer 3</StyledTableCell>
                            <StyledTableCell align="right">Subject</StyledTableCell>
                            <StyledTableCell align="right">Subject Code</StyledTableCell>
                            <StyledTableCell align="right">Tag</StyledTableCell>
                            <StyledTableCell align="right">Group ID</StyledTableCell>
                            <StyledTableCell align="right">Student Count</StyledTableCell>
                            <StyledTableCell align="right">Duration</StyledTableCell>
                            <StyledTableCell align="right">Edit/Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell align="right">{row.lecturers[0]}</StyledTableCell>
                                <StyledTableCell align="right">{row.lecturers[1]}</StyledTableCell>
                                <StyledTableCell align="right">{row.lecturers[2]}</StyledTableCell>
                                <StyledTableCell align="right">{row.subject}</StyledTableCell>
                                <StyledTableCell align="right">{row.subjectCode}</StyledTableCell>
                                <StyledTableCell align="right">{row.tag}</StyledTableCell>
                                <StyledTableCell align="right">{row.groupId}</StyledTableCell>
                                <StyledTableCell align="right">{row.studentCount}</StyledTableCell>
                                <StyledTableCell align="right">{row.noOfHours}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {/*<Link to={"/lecturer/edit/" +row._id} className="btn btn-primary"> Edit/Delete </Link>*/}
                                    <Link to={"/session/edit/" +row._id}>
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
