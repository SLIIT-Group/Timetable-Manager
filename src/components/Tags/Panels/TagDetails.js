import React, {useEffect, useState} from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tags from "../SubComponents/Tags";
import {Link} from "react-router-dom";

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

export default function TagDetails() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const [studentList, setStudentList] = useState([]);



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
            <Typography className={classes.heading}>Manage Tag Details</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <Row className="p-0 m-0  col-md-12 d-flex bd-highlight justify-content-center">


              <div className="form-group row col-md-12 d-flex bd-highlight mx-5 px-5">

                <Col className="d-flex justify-content-start">
                  <Link to={"/addTag"}>
                    <input type="submit" value="Add Tag Record" className= "btn btn-primary"/>
                  </Link>
                </Col>
                <Col >
                  <div className="main">
                    <div className="input-group">
                      <input
                          type="text"
                          className="input mt-1"
                          style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </Col>


              </div>

              <Tags />
            </Row>

          </AccordionDetails>
        </Accordion>
      </div>
  );
}
