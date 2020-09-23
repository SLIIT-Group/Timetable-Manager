import React, {useState} from 'react';
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
    console.log(key);
  };


  const [key, setKey] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
    selectedComponent = <Lecturer key={key} setKey={setKey}/>;
  }else if (select === "session") {
    selectedComponent = <Session key={key} setKey={setKey}/>;
  }else if (select === "group") {
    selectedComponent = <GrpIDs key={key} setKey={setKey}/>;
  }else {
    selectedComponent = <SubGrpIDs key={key} setKey={setKey}/>;
  }

  const notAvailable = () => {

      const req = {
        type: select,
        key: key,
        day: day,
        startTime: startTime,
        endTime: endTime,
      };

      axios.post("http://localhost:5000/api/notAvailable/add", req).then((res) => {
        if (res.data.success) {
          swal("Successful","Entry Saved Successfully","success");
        }else{
          swal("Unsuccessful","Entry Saving Failed", "error");
        }
      });

      setKey("");
      setDay("");
      setStartTime("");
      setEndTime("");


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
                            value={day}
                            onChange={(event) => setDay(event.target.value)}
                            label="lKey"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"monday"}>{"Monday"}</MenuItem>
                          <MenuItem value={"tuesday"}>{"Tuesday"}</MenuItem>
                          <MenuItem value={"wednesday"}>{"Wednesday"}</MenuItem>
                          <MenuItem value={"thursday"}>{"Thursday"}</MenuItem>
                          <MenuItem value={"friday"}>{"Friday"}</MenuItem>
                          <MenuItem value={"saturday"}>{"Saturday"}</MenuItem>
                          <MenuItem value={"sunday"}>{"Sunday"}</MenuItem>

                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="row col-md-12 mt-3">
                    <Col sm="6 pb-0">
                      <label className="mt-3 h5 font-weight-bold">Start Time :</label>
                    </Col>
                    <div className="input-field col s6 d-flex flex-column">
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={startTime}
                            onChange={(event) => setStartTime(event.target.value)}
                            label="lKey"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"8.30"}>{"8.30"}</MenuItem>
                          <MenuItem value={"9.30"}>{"9.30"}</MenuItem>
                          <MenuItem value={"10.30"}>{"10.30"}</MenuItem>
                          <MenuItem value={"11.30"}>{"11.30"}</MenuItem>
                          <MenuItem value={"12.30"}>{"12.30"}</MenuItem>
                          <MenuItem value={"1.30"}>{"1.30"}</MenuItem>
                          <MenuItem value={"2.30"}>{"2.30"}</MenuItem>
                          <MenuItem value={"3.30"}>{"3.30"}</MenuItem>
                          <MenuItem value={"4.30"}>{"4.30"}</MenuItem>
                          <MenuItem value={"5.30"}>{"5.30"}</MenuItem>
                          <MenuItem value={"6.00"}>{"6.00"}</MenuItem>
                          <MenuItem value={"7.00"}>{"7.00"}</MenuItem>

                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="row col-md-12 mt-3">
                    <Col sm="6 pb-0">
                      <label className="mt-3 h5 font-weight-bold">End Time :</label>
                    </Col>
                    <div className="input-field col s6 d-flex flex-column">
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={endTime}
                            onChange={(event) => setEndTime(event.target.value)}
                            label="lKey"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>

                          <MenuItem value={"9.30"}>{"9.30"}</MenuItem>
                          <MenuItem value={"10.30"}>{"10.30"}</MenuItem>
                          <MenuItem value={"11.30"}>{"11.30"}</MenuItem>
                          <MenuItem value={"12.30"}>{"12.30"}</MenuItem>
                          <MenuItem value={"1.30"}>{"1.30"}</MenuItem>
                          <MenuItem value={"2.30"}>{"2.30"}</MenuItem>
                          <MenuItem value={"3.30"}>{"3.30"}</MenuItem>
                          <MenuItem value={"4.30"}>{"4.30"}</MenuItem>
                          <MenuItem value={"5.30"}>{"5.30"}</MenuItem>
                          <MenuItem value={"6.00"}>{"6.00"}</MenuItem>
                          <MenuItem value={"7.00"}>{"7.00"}</MenuItem>
                          <MenuItem value={"8.00"}>{"8.00"}</MenuItem>

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
          </AccordionDetails>
        </Accordion>
      </div>
  );
}