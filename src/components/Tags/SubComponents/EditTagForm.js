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
export default function EditTagForm(props) {
    const classes = useStyles();

    const [_id, setID] = useState('');

    const [tag, setTag] = useState('');
    function handleTagChange(e) {
        setTag(e.target.value)
    }


    const updateTag = () => {
        if(tag === ''){
            swal("Unsuccessful","Empty Fields", "error");
        }else {
            const req = {
                tag: tag,
                id:_id,
            };

            axios.post("http://localhost:5000/api/tags/update", req).then((res) => {
                if (res.data === "Update complete") {
                    swal("Successful", "Tag Entry Updated Successfully", "success");
                } else {
                    swal("Unsuccessful", "Tag Entry Updating Failed", "error");
                }

            });
            setTag("");
            props.history.push('/tags');

        }

    };


    useEffect(() => {
        axios

            .get("http://localhost:5000/api/tags/byID/"+props.match.params.id)
            .then((res) => {
                setID(props.match.params.id);
                setTag(res.data.tag);

            });


    },[])


    const resetTag = () => {
        setTag("");


    };

    return (
        <React.Fragment>
            {props.noBackBtn === true ?
               null : <>
                    <CssBaseline />
                    <ReactLink style={navStyle} to='/tags'>
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
                        Edit Tag
                    </Typography>

                    <React.Fragment>
                        <Grid item xs={12}>
                            <TextField
                                value={tag}
                                onChange={handleTagChange}
                                id="standard-full-width"
                                label="Enter New Tag Name"
                                style={{ margin: 8 }}
                                placeholder="Eg: Lecture, Tute, Lab"
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
                                onClick={resetTag}
                            >
                                Reset
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={updateTag}
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
