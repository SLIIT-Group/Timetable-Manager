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

export default function SessionTableAddNO() {
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



    const [no1, setNo1] = useState("");
    const [no2, setNo2] = useState("");
    const [no3, setNo3] = useState("");

    const updateNo1 = (item) => {
        setNo1(item);
    };
    const updateNo2 = (item) => {
        setNo2(item);
    };
    const updateNo3 = (item) => {
        setNo3(item);
    };

    const notOverlapSession = () => {

        const req = {
            no1: no1,
            no2: no2,
            no3: no3,
        };

        if(no1 === "" || no2 === ""){
            swal("Unsuccessful","Select At Least Two", "error");
        }
        else {
            axios.post("http://localhost:5000/api/nos/add", req).then((res) => {
                if (res.data.success) {
                    swal("Successful", "Entry Saved Successfully", "success");
                } else {
                    swal("Unsuccessful", "Entry Saving Failed", "error");
                }
            });
        }

        setNo1("");
        setNo2("");
        setNo3("");


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

            {no1&& no2  ? <>
            <div className="row col-md-12">
                <Col sm="6 pb-0 text-center">
                    <label className="mt-3 h5 font-weight-bold text-center">Not Overlap Session 1:</label>
                </Col>
                <div className="input-field col s6">
                    <div className="form-group">
                        <input type="text" className="form-control" value={no1.subject+" "+ no1.tag+" "+ no1.groupId} />
                    </div>
                </div>
            </div>


            <div className="row col-md-12">
                <Col sm="6 pb-0 text-center">
                    <label className="mt-3 h5 font-weight-bold text-center">Not Overlap Session 2:</label>
                </Col>
                <div className="input-field col s6">
                    <div className="form-group">
                        <input type="text" className="form-control" value={no2.subject+" "+ no2.tag+" "+ no2.groupId} />
                    </div>
                </div>
            </div>


                {no3 ? <>
            <div className="row col-md-12">
                <Col sm="6 pb-0 text-center">
                    <label className="mt-3 h5 font-weight-bold text-center">Not Overlap Session 3:</label>
                </Col>
                <div className="input-field col s6">
                    <div className="form-group">
                        <input type="text" className="form-control" value={no3.subject+" "+ no3.tag+" "+ no3.groupId} />
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
                            <Button variant="contained" color="primary" className="btn-block pr-1" onClick={notOverlapSession}  >
                                Not Overlap Sessions
                            </Button>
                        </Col>

                    </Row>

                </Col>

            </div>

            </>:null}






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
                                        onClick={() => updateNo1(row)}
                                    >
                                        Select
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => updateNo2(row)}
                                    >
                                        Select
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => updateNo3(row)}
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
