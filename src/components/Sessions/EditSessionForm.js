import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import swal from "sweetalert";

const level = [
    {
        value: 1,
        label: 'Professor',
    },
    {
        value: 2,
        label: 'Assistant Professor',
    },
    {
        value: 3,
        label: 'Senior Lecturer(HG)',
    },
    {
        value: 4,
        label: 'Senior Lecturer',
    },
    {
        value: 5,
        label: 'Lecturer',
    },
    {
        value: 6,
        label: 'Assistant Lecturer',
    },
    {
        value: 7,
        label: 'Instructors',
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

export default function LecturerForm(props) {
    const classes = useStyles();

    const [lecturers, setLecturers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [tags, setTags] = useState([]);
    const [groups, setGroups] = useState([]);

    const [lecturerName, setLecturerName] = useState('');
    const [lecturerName2, setLecturerName2] = useState('');
    const [lecturerName3, setLecturerName3] = useState('');

    const [lecturersToDB, setLecturersToDB] = useState([]);

    const [subjectName, setSubjectName] = useState();
    const [subjectCode, setSubjectCode] = useState('');
    const [tagName, setTagName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [studentCount, setStudentCount] = useState('');
    const [noHours, setNoHours] = useState('');

    const handleLecturerName = (event) => {
        setLecturerName(event.target.value);
        lecturersToDB[0] = event.target.value;
    }

    const handleLecturerName2 = (event) => {
        setLecturerName2(event.target.value);
        lecturersToDB[1] = event.target.value;
    }

    const handleLecturerName3 = (event) => {
        setLecturerName3(event.target.value);
        lecturersToDB[2] = event.target.value;
    }

    const handleSubjectName = (event) => {
        setSubjectName((event.target.value).substr(7));
        setSubjectCode((event.target.value).substr(0, 6));
        console.log((event.target.value).substr(7));
    }

    const handleTag = (event) => {
        setTagName(event.target.value);
    }

    const handleGroupId = (event) => {
        setGroupId(event.target.value);
    }

    const handleStudentCount = (event) => {
        setStudentCount(event.target.value);
    }

    const handleNoOfHours = (event) => {
        setNoHours(event.target.value);
    }

    useEffect(() => {
        //console.log(props)

        axios.get("http://localhost:5000/api/lecturers")
            .then((response) => {
                setLecturers(response.data);
                //console.log(lecturers)
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:5000/api/subjects")
            .then((response) => {
                setSubjects(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:5000/api/tags/all")
            .then((res) => {
                setTags(res.data);
            });

        axios
            .get("http://localhost:5000/api/students/all")
            .then((res) => {
                setGroups(res.data);
            });

        axios.get('http://localhost:5000/api/sessions/edit/' +props.sessionId)
            .then(response => {
                setLecturerName(response.data.lecturers[0]);
                setLecturerName2(response.data.lecturers[1]);
                setLecturerName3(response.data.lecturers[2]);

                //setLecturersToDB([response.data.lecturers.slice()]);

                lecturersToDB[0] = response.data.lecturers[0];
                lecturersToDB[1] = response.data.lecturers[1];
                lecturersToDB[2] = response.data.lecturers[2];

                setSubjectName(response.data.subject);
                setSubjectCode(response.data.subjectCode);
                setTagName(response.data.tag);
                setGroupId(response.data.groupId);
                setStudentCount(response.data.studentCount);
                setNoHours(response.data.noOfHours);
                //console.log(response.data.lecturers[0]);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const updateSession = () => {
        const req = {
            // lecturer1: lecturerName,
            // lecturer2: lecturerName2,
            // lecturer3: lecturerName3,
            lecturers: lecturersToDB,
            subject: subjectName,
            subjectCode: subjectCode,
            tag: tagName,
            groupId: groupId,
            studentCount: studentCount,
            noOfHours: noHours
        };

        axios.post('http://localhost:5000/api/sessions/update/' +props.sessionId, req)
            .then((res) => {
                if(res.data == 'Update complete'){
                    swal("Successful", "Session details updated", "success");
                }else{
                    swal("Unsuccessful", "Error while updating details", "error");
                }
            });

        setLecturerName('');
        setLecturerName2('');
        setLecturerName3('');
        setLecturersToDB([]);
        setSubjectName();
        setSubjectCode('');
        setTagName('');
        setGroupId('');
        setStudentCount('');
        setNoHours('');
    };

    const deleteSession = () => {
        axios.get('http://localhost:5000/api/sessions/delete/' +props.sessionId)
            .then((res) => {
                if(res.data == 'Successfully removed'){
                    swal("Successful", "Session details removed", "success");
                }else{
                    swal("Unsuccessful", "Error while deleting details", "error");
                }
            });

        setLecturerName('');
        setLecturerName2('');
        setLecturerName3('');
        setLecturersToDB([]);
        setSubjectName();
        setSubjectCode('');
        setTagName('');
        setGroupId('');
        setStudentCount('');
        setNoHours('');
    }


    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="lecturerId"
                        select
                        label="Lecturer"
                        value={lecturerName}
                        onChange={handleLecturerName}
                        variant="filled"
                        fullWidth
                    >
                        {lecturers.map((option) => (
                            <MenuItem key={option._id} value={`${option.fname} ${option.lname}`}>
                                {`${option.fname} ${option.lname}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="lecturerId2"
                        select
                        label="Lecturer 2"
                        value={lecturerName2}
                        onChange={handleLecturerName2}
                        variant="filled"
                        fullWidth
                    >
                        {lecturers.map((option) => (
                            <MenuItem key={option._id} value={`${option.fname} ${option.lname}`}>
                                {`${option.fname} ${option.lname}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="lecturerId3"
                        select
                        label="Lecturer 3"
                        value={lecturerName3}
                        onChange={handleLecturerName3}
                        variant="filled"
                        fullWidth
                    >
                        {lecturers.map((option) => (
                            <MenuItem key={option._id} value={`${option.fname} ${option.lname}`}>
                                {`${option.fname} ${option.lname}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="subjectNameId"
                        select
                        label="Subject"
                        value={subjectName}
                        onChange={handleSubjectName}
                        variant="filled"
                        fullWidth
                    >
                        {subjects.map((option) => (
                            <MenuItem key={option._id} value={`${option.subCode} ${option.subName}`}>
                                {`${option.subCode} ${option.subName}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="subjectCodeId"
                        name="subjectCodeName"
                        label="Subject Code"
                        value={subjectCode}
                        fullWidth
                        autoComplete="shipping address-line1"
                        //onChange={handleEmpidChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="tagId"
                        select
                        label="Tag"
                        value={tagName}
                        onChange={handleTag}
                        variant="filled"
                        fullWidth
                    >
                        {tags.map((option) => (
                            <MenuItem key={option._id} value={option.tag}>
                                {option.tag}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="groupId"
                        select
                        label="Group ID"
                        value={groupId}
                        onChange={handleGroupId}
                        variant="filled"
                        fullWidth
                    >
                    {tagName == "Lecture" || tagName == "Tutorial" ?
                        (groups.map((item) => (
                            <MenuItem key={item._id} value={item.academicYrSem+"."+item.programme+"."+item.grpNo}>
                                {item.academicYrSem+"."+item.programme+"."+item.grpNo}
                            </MenuItem>
                        ))) :
                        (groups.map((item) => (
                            <MenuItem key={item._id} value={item.academicYrSem+"."+item.programme+"."+item.grpNo+"."+item.subGrpNo}>
                                {item.academicYrSem+"."+item.programme+"."+item.grpNo+"."+item.subGrpNo}
                            </MenuItem>
                        )))
                    }
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="studentCountId"
                        name="studentCount"
                        label="Student Count"
                        value={studentCount}
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={handleStudentCount}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="noHoursId"
                        name="noHours"
                        label="No. of hours"
                        value={noHours}
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={handleNoOfHours}
                    />
                </Grid>
            </Grid>

            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={updateSession}
                >
                    Update
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={deleteSession}
                >
                    Delete
                </Button>

            </div>
        </React.Fragment>
    );
}
