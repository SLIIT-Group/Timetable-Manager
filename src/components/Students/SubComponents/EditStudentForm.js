import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import axios from "axios";
import swal from "sweetalert";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Link as ReactLink} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Copyright from "../../Commons/Copyright";


const navStyle = {
    color: '#fff',
    textDecoration: 'none',
};

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));
export default function EditStudentForm(props) {
    const classes = useStyles();

    const [_id, setID] = useState('');

    const [academicYrSem, setAcademicYrSem] = useState('');
    function handleAcademicYrSemChange(e) {
        setAcademicYrSem(e.target.value)
    }

    const [programme, setProgramme] = useState('');
    function handleProgrammeChange(e) {
        setProgramme(e.target.value)
    }

    const [grpNo, setGrpNo] = useState('');
    function handleGrpNo(e) {
        setGrpNo(e.target.value)
    }

    const [subGrpNo, setSubGrpNo] = useState('');
    function handleSubGrpNoChange(e) {
        setSubGrpNo(e.target.value)
    }

    const updateStudent = () => {
        if(academicYrSem === '' || programme === '' || grpNo === '' || subGrpNo === ''){
            swal("Unsuccessful","Empty Fields", "error");
        }else {
            const req = {
                academicYrSem: academicYrSem,
                programme: programme,
                grpNo: grpNo,
                grpID: academicYrSem + "." + programme + "." + grpNo,
                subGrpNo: subGrpNo,
                subGrpID: academicYrSem + "." + programme + "." + grpNo + "." + subGrpNo,
                id: _id,
            };

            axios.post("http://localhost:5000/api/students/update", req).then((res) => {
                if (res.data === "Update complete") {
                    swal("Successful","Student Entry Updated Successfully","success");
                } else {
                    swal("Unsuccessful","Student Entry Updating Failed", "error");
                }

            });
            setAcademicYrSem("");
            setProgramme("");
            setGrpNo("");
            setSubGrpNo("");
            setID("");
            props.history.push('/student');
        }
    };


    useEffect(() => {
        axios

            .get("http://localhost:5000/api/students/byID/"+props.match.params.id)
            .then((res) => {

                setAcademicYrSem(res.data.academicYrSem);
                setProgramme(res.data.programme);
                setGrpNo(res.data.grpNo);
                setSubGrpNo(res.data.subGrpNo);
                setID(res.data._id)
            });


    },[])


    const resetStudent = () => {
       setAcademicYrSem("");
        setProgramme("");
        setGrpNo("");
        setSubGrpNo("");
        setID("");


    };

    return (
        <React.Fragment>
            {props.noBackBtn === true ?
               null : <>
                    <CssBaseline />
                    <ReactLink style={navStyle} to='/student'>
                        <div style={{ marginTop: -30, marginLeft: 20 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}

                            >
                                Back
                            </Button>
                        </div>
                    </ReactLink>
                </>}


            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h4' align='center'>
                        Add Student
                    </Typography>

                    <React.Fragment>
                        <Grid item xs={12}>
                            <TextField
                                value={academicYrSem}
                                onChange={handleAcademicYrSemChange}
                                id="standard-full-width"
                                label="Enter New Academic Year and Semester"
                                style={{ margin: 8 }}
                                placeholder="Eg: Y1.S1, Y1.S2"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={programme}
                                onChange={handleProgrammeChange}
                                id="standard-full-width"
                                label="Enter New Programme"
                                style={{ margin: 8 }}
                                placeholder="Eg: IT/CSSE"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={grpNo}
                                type="number"
                                onChange={handleGrpNo}
                                id="standard-full-width"
                                label="Enter New Group Number"
                                style={{ margin: 8 }}
                                placeholder="Eg: 01,02"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={subGrpNo}
                                type="number"
                                onChange={handleSubGrpNoChange}
                                id="standard-full-width"
                                label="Enter Sub New Group Number"
                                style={{ margin: 8 }}
                                placeholder="Eg: 1,2"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={resetStudent}
                            >
                                Reset
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={updateStudent}
                            >
                                Update
                            </Button>

                        </div>
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>


        </React.Fragment>
    );
}
