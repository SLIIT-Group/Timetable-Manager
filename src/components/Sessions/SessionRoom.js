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
import 'regenerator-runtime/runtime';

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

        axios.get("http://localhost:5000/api/session_preferredRoom/")
            .then((response) => {
                setSessionRooms(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:5000/api/room_group/")
            .then((response) => {
                setGroupRooms(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:5000/api/room_lecturer/")
            .then((response) => {
                setLecturerRooms(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:5000/api/room_subject_tag/")
            .then((response) => {
                setSubjectTagRooms(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:5000/api/tag_room/")
            .then((response) => {
                setTagRooms(response.data);
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

    function refreshPage() {
        window.location.reload(false);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function allocateRooms(){
        for (let i = 0; i < sessions.length; i++) {
            let roomsArray = [];
            let sessionId = sessions[i]._id;
            let groupId = sessions[i].groupId;
            let lecturerName = sessions[i].lecturers[0];
            let subjectName = sessions[i].subject;
            let tagName = sessions[i].tag;

            for (let i = 0; i < sessionRooms.length; i++) {
                if(sessionId == sessionRooms[i].id){
                    roomsArray.push(sessionRooms[i].room)
                }
            }

            for (let i = 0; i < groupRooms.length; i++) {
                if(groupId == groupRooms[i].group){
                    roomsArray.push(groupRooms[i].room);
                }
            }

            for (let i = 0; i < lecturerRooms.length; i++) {
                //console.log(lecturerName);
                //console.log(lecturerRooms[i].lecturer);;

                if(lecturerName == lecturerRooms[i].lecturer){
                    roomsArray.push(lecturerRooms[i].room)
                }
            }

            for (let i = 0; i < subjectTagRooms.length; i++) {
                if(subjectName == subjectTagRooms[i].subject && tagName == subjectTagRooms[i].tag){
                    roomsArray.push(subjectTagRooms[i].room)
                }
            }

            for (let i = 0; i < tagRooms.length; i++) {
                if(tagName == tagRooms[i].tag){
                    roomsArray.push(tagRooms[i].room)
                }
            }

            const req = {
                lecturers: sessions[i].lecturers,
                subject: sessions[i].subject,
                subjectCode: sessions[i].subjectCode,
                tag: sessions[i].tag,
                groupId: sessions[i].groupId,
                studentCount: sessions[i].studentCount,
                noOfHours: sessions[i].noOfHours,
                rooms: roomsArray
            };

            console.log(roomsArray);

            axios.post('http://localhost:5000/api/sessions/update/' +sessionId, req)
                .then((res) => {
                    if(res.data == 'Update complete'){
                        //swal("Successful", "Session details updated", "success");
                        console.log('Successfully locations added')
                    }else{
                        //swal("Unsuccessful", "Error while updating details", "error");
                        console.log('Error while adding locations')
                    }
                });
        }

        swal("Successful", "Preferred locations added to all sessions automatically", "success").then(refreshPage);
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
                            <StyledTableCell align="right">Candidate Locations</StyledTableCell>
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
                                    {
                                        row.rooms.map((item) => (
                                            item+ ", "
                                        ))
                                    }
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
