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
import {Link as ReactLink, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import { Col, Row} from "reactstrap";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import swal from "sweetalert";

const navStyle = {
    color: '#fff',
    textDecoration: 'none',
};
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

export default function SessionTableAddPS() {
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


    const [ps1, setPs1] = useState("");
    const [ps2, setPs2] = useState("");
    const [ps3, setPs3] = useState("");

    const updatePs1 = (item) => {
        setPs1(item);
    };
    const updatePs2 = (item) => {
        setPs2(item);
    };
    const updatePs3 = (item) => {
        setPs3(item);
    };

    const parallelSession = () => {

        const req = {
            ps1: ps1,
            ps2: ps2,
            ps3: ps3,
        };

        if(ps1 === "" || ps2 === ""){
            swal("Unsuccessful","Select At Least Two", "error");
        }
        else {
            axios.post("https://kaalaapi.herokuapp.com/api/ps/add", req).then((res) => {
                if (res.data.success) {
                    swal("Successful", "Entry Saved Successfully", "success");
                } else {
                    swal("Unsuccessful", "Entry Saving Failed", "error");
                }
            });
        }

        setPs1("");
        setPs2("");
        setPs3("");


    };





    return (
        <div className="p-4">

            <CssBaseline />
            <ReactLink style={navStyle} to='/section3'>
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

            {ps1&& ps2  ? <>
            <div className="row col-md-12">
                <Col sm="6 pb-0 text-center">
                    <label className="mt-3 h5 font-weight-bold text-center">Parallel Session 1:</label>
                </Col>
                <div className="input-field col s6">
                    <div className="form-group">
                        <input type="text" className="form-control" value={ps1.subject+" "+ ps1.tag+" "+ ps1.groupId} />
                    </div>
                </div>
            </div>


            <div className="row col-md-12">
                <Col sm="6 pb-0 text-center">
                    <label className="mt-3 h5 font-weight-bold text-center">Parallel Session 2:</label>
                </Col>
                <div className="input-field col s6">
                    <div className="form-group">
                        <input type="text" className="form-control" value={ps2.subject+" "+ ps2.tag+" "+ ps2.groupId} />
                    </div>
                </div>
            </div>

            {ps3 ? <>
            <div className="row col-md-12">
                <Col sm="6 pb-0 text-center">
                    <label className="mt-3 h5 font-weight-bold text-center">Parallel Session 3:</label>
                </Col>
                <div className="input-field col s6">
                    <div className="form-group">
                        <input type="text" className="form-control" value={ps3.subject+" "+ ps3.tag+" "+ ps3.groupId}/>
                    </div>
                </div>
            </div>
            </>:null}



            <div className="row col-md-12 mt-0 mb-3">

                <div className="input-field col s6">

                </div>
                <Col sm="6 pb-0">
                    <Row>
                        <Col>
                            <Button variant="contained" color="primary" className="btn-block pr-1" onClick={parallelSession} >
                                Parallel Sessions
                            </Button>
                        </Col>

                    </Row>

                </Col>

            </div>
            </> : null}







            <div className="form-group">

                <div className="row col-md-12">
                    <Col sm="6 pb-0 text-right">
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleRadioButtonChange} row>
                                <FormControlLabel value="subject" control={<Radio />} label="Subject" />
                                <FormControlLabel value="tag" control={<Radio />} label="Tag" />
                            </RadioGroup>
                        </FormControl>
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
                                placeholder="Search"
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

            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Lecturers</StyledTableCell>
                            <StyledTableCell align="right">Subject</StyledTableCell>
                            <StyledTableCell align="right">Subject Code</StyledTableCell>
                            <StyledTableCell align="right">Tag</StyledTableCell>
                            <StyledTableCell align="right">Group ID</StyledTableCell>
                            <StyledTableCell align="right">Select 1</StyledTableCell>
                            <StyledTableCell align="right">Select 2</StyledTableCell>
                            <StyledTableCell align="right">Select 3</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell align="right">{row.lecturers[0]}<br/>{row.lecturers[1]}<br/>{row.lecturers[2]}</StyledTableCell>
                                <StyledTableCell align="right">{row.subject}</StyledTableCell>
                                <StyledTableCell align="right">{row.subjectCode}</StyledTableCell>
                                <StyledTableCell align="right">{row.tag}</StyledTableCell>
                                <StyledTableCell align="right">{row.groupId}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => updatePs1(row)}
                                    >
                                        Select
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => updatePs2(row)}
                                    >
                                        Select
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => updatePs3(row)}
                                    >
                                        Select
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
