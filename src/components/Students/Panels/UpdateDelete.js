import React, {useState} from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Row, Col, Button} from "reactstrap";
import AcademicYrSem from "../SubComponents/AcademicYrSem";
import GrpIDs from "../SubComponents/GrpIDs";
import Programme from "../SubComponents/Programme";
import GrpNum from "../SubComponents/GrpNum";
import SubGrpNum from "../SubComponents/SubGrpNum";
import SubGrpIDs from "../SubComponents/SubGrpIDs";

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


export default function UpdateDelete() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [select, setSelect] = useState(1);
  let element1 = "warning", element2 = "warning", element3 = "warning", element4 = "warning", element5 = "warning", element6 = "warning";
  if(select === 1){
    element1 = "primary";
  }else if (select === 2) {
    element2 = "primary";
  }else if (select === 3) {
    element3 = "primary";
  }else if (select === 4) {
    element4 = "primary";
  }else if (select === 5) {
    element5 = "primary";
  }else {
    element6 = "primary";
  }
  let selectedComponent = null;
  if(select === 1){
    selectedComponent = <AcademicYrSem />;
  }else if (select === 2) {
    selectedComponent = <Programme />;
  }else if (select === 3) {
    selectedComponent = <GrpNum />;
  }else if (select === 4) {
    selectedComponent = <GrpIDs />;
  }else if (select === 5) {
    selectedComponent = <SubGrpNum />;
  }else {
    selectedComponent = <SubGrpIDs />;
  }
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
          <Typography className={classes.heading}>Update and Delete by Category</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <div className="col-md-12 ">
          <Row className="col-md-12 d-flex btn-block">
            <Col md="2" sm="6" className="pr-1 btn-block mt-2">
              <Button className="btn-block" color={element1} onClick={()=> {setSelect(1);}} ><label>Academic Yr</label><br /><label className="mb-1">and Sem</label><label/></Button>
            </Col>
            <Col md="2" sm="6" className="pr-1 btn-block">
              <Button className="btn-block" color={element2} onClick={()=> {setSelect(2);}}><label>Academic</label><br /><label className="mb-1">Programme</label></Button>
            </Col>
            <Col md="2" sm="6" className="pr-1 btn-block">
              <Button className="btn-block" color={element3} onClick={()=> {setSelect(3);}}><label>Group</label><br /><label className="mb-1">Number</label></Button>
            </Col>
            <Col md="2" sm="6" className="pr-1 btn-block">
              <Button className="btn-block" color={element4} onClick={()=> {setSelect(4);}}><label>Group</label><br /><label className="mb-1">ID</label></Button>
            </Col>
            <Col md="2" sm="6" className="pr-1 btn-block">
              <Button className="btn-block" color={element5} onClick={()=> {setSelect(5);}}><label>Sub Group</label><br /><label className="mb-1">Number</label></Button>
            </Col>
            <Col md="2" sm="6" className="pr-1 btn-block">
              <Button className="btn-block" color={element6} onClick={()=> {setSelect(6);}}><label>Sub Group</label><br /><label className="mb-1">ID</label></Button>
            </Col>
          </Row>

            <br />
            <Row className="col-md-12 d-flex bd-highlight">
              {selectedComponent}
            </Row>
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
