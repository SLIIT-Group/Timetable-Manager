import React, {useEffect, useState} from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

export default function ViewStudentDetails() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios

        .get("http://localhost:5000/api/students/all")
        .then((res) => {
          setStudentList(res.data);
        });

  });

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography className={classes.heading}>View Student Details</Typography>

        </AccordionSummary>
        <AccordionDetails>

            <Row className="p-0 m-0  col-md-12">
            {studentList.map((item) => (
                <Col md="6" className="p-4 shadow-sm ">
                  <div className="border border-secondary">

                    <Row className=" pt-2 d-flex justify-content-center">
                      <p className="text-secondary">Academic Year and Sem :</p>
                      <p className="text-dark font-weight-bold">{item.academicYrSem}</p>
                    </Row>
                    <Row className=" d-flex justify-content-center">
                      <p className="text-secondary">Programme :</p>
                      <p className="text-dark font-weight-bold">{item.programme}</p>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <p className="text-secondary">Group Number :</p>
                      <p className="text-dark font-weight-bold">{item.grpNo}</p>
                    </Row>
                    <Row className=" d-flex justify-content-center">
                      <p className="text-secondary">Group ID :</p>
                      <p className="text-dark font-weight-bold">{item.grpID}</p>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <p className="text-secondary">Sub Group Number :</p>
                      <p className="text-dark font-weight-bold">{item.subGrpNo}</p>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <p className="text-secondary">Sub Group ID :</p>
                      <p className="text-dark font-weight-bold">{item.subGrpID}</p>
                    </Row>

                  </div>

                </Col>


            ))}
            </Row>

        </AccordionDetails>
      </Accordion>
    </div>
  );
}
