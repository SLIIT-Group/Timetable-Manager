import React, {useState} from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Col } from 'reactstrap';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

export default function NewStudentEntry() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

  const saveStudent = () => {
    const req = {
      academicYrSem: academicYrSem,
      programme: programme,
      grpNo: grpNo,
      grpID: academicYrSem+"."+programme+"."+grpNo,
      subGrpNo: subGrpNo,
      subGrpID : academicYrSem+"."+programme+"."+grpNo+"."+subGrpNo,
    };

    axios.post("http://localhost:5000/api/students/add", req).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        alert("Student Entry Saved Successfully");
      }else{
        alert("Student Entry Saving Failed");
      }
    });
    setAcademicYrSem("");
    setProgramme("");
    setGrpNo("");
    setSubGrpNo("");
  };

  const resetStudent = () => {
    setAcademicYrSem("");
    setProgramme("");
    setGrpNo("");
    setSubGrpNo("");
  };

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
          <Typography className={classes.heading}>Add New Student Entry</Typography>

        </AccordionSummary>
        <AccordionDetails> <>
          <div className="col-md-12 row px-5">
            <div className="row col-md-12">
              <Col sm="6 pb-0">
                <div className="h5 font-weight-bold text-center pt-4">
                  Enter New Academic Year and Semester :
                </div>
              </Col>
              <div className="input-field col s6">
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
              </div>
            </div>


            <div className="row col-md-12">
              <Col sm="6 pb-0">
                <div className="h5 font-weight-bold text-center pt-4">
                  Enter New Programme :
                </div>
              </Col>
              <div className="input-field col s6">
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
              </div>
            </div>


            <div className="row col-md-12">
              <Col sm="6 pb-0">
                <div className="h5 font-weight-bold text-center pt-4">
                  Enter New Group Number :
                </div>
              </Col>
              <div className="input-field col s6">
                <TextField
                    value={grpNo}
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
              </div>
            </div>


            <div className="row col-md-12">
              <Col sm="6 pb-0">
                <div className="h5 font-weight-bold text-center pt-4">
                  Enter New Sub Group Number :
                </div>
              </Col>
              <div className="input-field col s6">
                <TextField
                    value={subGrpNo}
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
              </div>
            </div>


            <div className="col-md-12 row px-1 mt-3">
              <Col sm="6 pb-0">
                <Button variant="contained" color="secondary" className="btn-block" onClick={resetStudent}>
                  Reset
                </Button>
              </Col>
              <Col sm="6 pb-0">
                <Button variant="contained" color="primary" className="btn-block" onClick={saveStudent}>
                  Add
                </Button>
              </Col>
            </div>
          </div>
        </>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
