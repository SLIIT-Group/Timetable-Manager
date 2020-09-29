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
import swal from "sweetalert";

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

export default function SessionRoom() {
    const classes = useStyles();
    const [sessions, setSessions] = useState([]);

    const [sessionRooms, setSessionRooms] = useState([]);
    const [groupRooms, setGroupRooms] = useState([]);
    const [lecturerRooms, setLecturerRooms] = useState([]);
    const [subjectTagRooms, setSubjectTagRooms] = useState([]);
    const [tagRooms, setTagRooms] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/sessions")
            .then((response) => {
                setSessions(response.data);
                setSearchResults(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const results = sessions.filter(session =>
            session.lecturer1.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    function allocateRooms(){
        sessions.map((session1) => {
            let sessionId = session1._id;
            let groupId = session1.groupId;
            let lecturerName = session1.lecturers[0];
            let subjectName = session1.subject;
            let tagName = session1.tag;

            // console.log(sessionId)
            // console.log(groupId)
            // console.log(lecturerName)
            // console.log(subjectName)
            // console.log(tagName)

            sessionRooms.map((sessionRoom1) => {

            })

            groupRooms.map((groupRoom1) => {

            })

            lecturerRooms.map((lecturerRoom1) => {

            })

            subjectTagRooms.map((subjectTagRoom1) => {

            })

            tagRooms.map((tagRoom1) => {

            })

            const req = {
                lecturers: session1.lecturers,
                subject: session1.subject,
                subjectCode: session1.subjectCode,
                tag: session1.tag,
                groupId: session1.groupId,
                studentCount: session1.studentCount,
                noOfHours: session1.noOfHours
            };

            console.log(req.lecturers);

            // axios.post("http://localhost:5000/api/sessions/add", req).then((res) => {
            //     if (res.data.success) {
            //         console.log(res.data);
            //     }else{
            //         console.log('error in adding session location')
            //     }
            // });
        })
    };

    return (
        <div>
            <h3 align="center"> Sessions List </h3>

            <div className="form-group">
                <input type="submit" value="Automatically Assign Rooms for Sessions" className= "btn btn-primary"
                       style={{marginLeft: 10}} onClick={allocateRooms}/>

                {/*<div style={{width:"25px", display:"inline-block"}} />*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Search"*/}
                {/*    value={searchTerm}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
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
