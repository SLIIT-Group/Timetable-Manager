import React, {useEffect, useState} from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Row, Col, Button} from "reactstrap";
import Lecturer from "../SubComponents/Lecturer";
import GrpIDs from "../SubComponents/GrpIDs";
import Session from "../SubComponents/Session";
import SubGrpIDs from "../SubComponents/SubGrpIDs";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import swal from "sweetalert";
import axios from "axios";
import NotAvailableTable from "../SubComponents/NotAvailableTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '10px',
    marginRight: '10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


export default function NotAvailable() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);

  };


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
      <div className={classes.root}>
        <Accordion
            style={
              expanded
                  ? { backgroundColor: '#f5f5f5' }
                  : { backgroundColor: '#3f51b5', color: '#fff' }
            }
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
        >
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
          >
            <Typography className={classes.heading}>Not Available</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <div className="col-md-12 ">
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
              <br/><br/>
              <Row className="p-0 m-0  col-md-12 d-flex bd-highlight justify-content-center flex-column">
              <NotAvailableTable />
              </Row>
            </div>

          </AccordionDetails>
        </Accordion>
      </div>
  );
}