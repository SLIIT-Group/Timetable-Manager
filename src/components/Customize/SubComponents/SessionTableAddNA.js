import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import {Link as ReactLink, Link} from "react-router-dom";
import ButtonM from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { Button, Col, Row} from "reactstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import swal from "sweetalert";
import Lecturer from "./Lecturer";
import Session from "./Session";
import GrpIDs from "./GrpIDs";
import SubGrpIDs from "./SubGrpIDs";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

export default function SessionTableAddCS() {
    const classes = useStyles();
    const [keys, setKey] = useState("");
    const [slot, setSlot] =  useState("");


    const [select, setSelect] = useState("lecturer");
    let element1 = "warning", element2 = "warning", element3 = "warning", element4 = "warning";
    if(select === "lecturer"){
        element1 = "primary";
    }else if (select === "session") {
        element2 = "primary";
    }else if (select === "group") {
        element3 = "primary";
    }else {
        element4 = "primary";
    }

    let selectedComponent = null;
    if(select === "lecturer"){
        selectedComponent = <Lecturer keys={keys} setKey={setKey} />;
    }else if (select === "session") {
        selectedComponent = <Session keys={keys} setKey={setKey} />;
    }else if (select === "group") {
        selectedComponent = <GrpIDs keys={keys} setKey={setKey} />;
    }else {
        selectedComponent = <SubGrpIDs keys={keys} setKey={setKey} />;
    }

    const notAvailable = () => {

        const req = {
            type: select,
            key: keys,
            slot: slot,
        };

        if(keys === "" || slot === ""){
            swal("Unsuccessful","Fill All Fields", "error");
        }
        else {
            axios.post("https://kaalaapi.herokuapp.com/api/notAvailable/add", req).then((res) => {
                if (res.data.success) {
                    swal("Successful", "Entry Saved Successfully", "success");
                } else {
                    swal("Unsuccessful", "Entry Saving Failed", "error");
                }
            });
        }

        setKey("");
        setSlot("");


    };
    const [dayList, setDayList] = useState([]);
    const [slotList, setSlotList] = useState([]);

    useEffect(() => {
        axios

            .get("https://kaalaapi.herokuapp.com/api/day")
            .then((res) => {
                setDayList(res.data);
            });

    },[]);

    const setSlots = (e) => {
        setSlotList(e.target.value);
    };

    const setFinalSlot = (e) => {
        setSlot(e.target.value);
    };


    return (
        <div className="p-4">

            <CssBaseline />
            <ReactLink style={navStyle} to='/section3'>
                <div style={{ marginTop: -30, marginLeft: 20 }}>
                    <ButtonM
                        variant="contained"
                        color="secondary"
                        className={classes.button}

                    >
                        Back
                    </ButtonM>
                </div>
            </ReactLink>





            <Row className="col-md-12 d-flex btn-block">
                <Col md="3" sm="6" className="pr-1 btn-block mt-2">
                    <Button className="btn-block" color={element1} onClick={()=> {setSelect("lecturer");}} ><label>Lecturer</label></Button>
                </Col>
                <Col md="3" sm="6" className="pr-1 btn-block">
                    <Button className="btn-block" color={element2} onClick={()=> {setSelect("session");}}><label>Session</label></Button>
                </Col>
                <Col md="3" sm="6" className="pr-1 btn-block">
                    <Button className="btn-block" color={element3} onClick={()=> {setSelect("group");}}><label>Group</label></Button>
                </Col>
                <Col md="3" sm="6" className="pr-1 btn-block">
                    <Button className="btn-block" color={element4} onClick={()=> {setSelect("subGroup");}}><label>Sub Group</label></Button>
                </Col>
            </Row>

            <br />
            <Row className="col-md-12 d-flex bd-highlight">
                {selectedComponent}

                <div className="col-md-12 row px-5">

                    <div className="row col-md-12 mt-3">
                        <Col sm="6 pb-0">
                            <label className="mt-3 h5 font-weight-bold">Day :</label>
                        </Col>
                        <div className="input-field col s6 d-flex flex-column">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={slotList}
                                    onChange={setSlots}
                                    label="lKey"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {dayList && dayList.map((item, key) => (
                                        <MenuItem value={item.slots} key={key}>{item.day}</MenuItem>

                                    ))}



                                </Select>
                            </FormControl>
                        </div>
                    </div>





                    <div className="row col-md-12 mt-3">
                        <Col sm="6 pb-0">
                            <label className="mt-3 h5 font-weight-bold">Slot :</label>
                        </Col>
                        <div className="input-field col s6 d-flex flex-column">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={slot}
                                    onChange={setFinalSlot}
                                    label="lKey"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {slotList && slotList.map((item, key) => (
                                        <MenuItem value={item} key={key}>{item.start} - {item.end}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </div>
                    </div>








                    <div className="row col-md-12 mt-3">

                        <div className="input-field col s6">

                        </div>
                        <Col sm="6 pb-0">
                            <Row>
                                <Col>
                                    <Button variant="contained" color="primary" className="btn-block pr-1" onClick={notAvailable}>
                                        Not Available
                                    </Button>
                                </Col>

                            </Row>

                        </Col>

                    </div>

                </div>

            </Row>
        </div>
    );
}
