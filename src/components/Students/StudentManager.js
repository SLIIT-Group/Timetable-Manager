import React from 'react';
import { Container } from '@material-ui/core';
import AcademicYrSem from "./Panels/AcademicYrSem";
import GenerateGrpIDs from "./Panels/GenerateGrpIDs";
import GenerateSubGrpIDs from "./Panels/GenerateSubGrpIDs";
import GrpNumAllocation from "./Panels/GrpNumAllocation";
import ProgramAllocation from "./Panels/ProgramAllocation";
import SubGrpNumAllocation from "./Panels/SubGrpNumAllocation";
import ViewStudentDetails from "./Panels/ViewStudentDetails";
import NewAcademicYrSem from "./Panels/NewAcademicYrSem";
import NewProgramAllocation from "./Panels/NewProgramAllocation";
import NewGrpNumAllocation from "./Panels/NewGrpNumAllocation";
import NewSubGrpNumAllocation from "./Panels/NewSubGrpNumAllocation";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Row from "react-bootstrap/Row";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function StudentManager() {


 const classes = useStyles();
 const [yrSem, setYrSem] = React.useState('');
    console.log(yrSem);
 const handleYrSemChange = (event) => {
 setYrSem(event.target.value);
 };

 const [prog, setProg] = React.useState('');
    console.log(prog);
 const handleProgChange = (event) => {
 setProg(event.target.value);
 };

 const [grpNo, setGrpNo] = React.useState('');
 console.log(grpNo);
 const handleGrpNoChange = (event) => {
 setGrpNo(event.target.value);
 };

 const [subGrpNo, setSubGrpNo] = React.useState('');
 console.log(setSubGrpNo);
 const handleSubGrpNoChange = (event) => {
 setSubGrpNo(event.target.value);
 };

  return (
      <div style={{ textAlign: 'center' }}>
          Student Manager
          <Container>
              <ViewStudentDetails />
              <NewAcademicYrSem />

              <br /><br />
              <Row className ="d-flex justify-content-center">
                  <label className="mt-4 h5 font-weight-bold">Select Academic Year and Semester</label>
                  <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={yrSem}
                          onChange={handleYrSemChange}
                          label="yrSem"
                      >
                          <MenuItem value="">
                              <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
              </FormControl></Row>


              { yrSem != "" ? ( <>
                  <AcademicYrSem />
                  <NewProgramAllocation />


                      <br /><br />
                      <Row className ="d-flex justify-content-center">
                          <label className="mt-4 h5 font-weight-bold">Select Program</label>
                          <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
                              <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={prog}
                                  onChange={handleProgChange}
                                  label="prog"
                              >
                                  <MenuItem value="">
                                      <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={10}>Ten</MenuItem>
                                  <MenuItem value={20}>Twenty</MenuItem>
                                  <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                          </FormControl></Row>


                      {prog != "" ?  (<>
                          <ProgramAllocation />
                          <NewGrpNumAllocation />


                          <br /><br />
                          <Row className ="d-flex justify-content-center">
                              <label className="mt-4 h5 font-weight-bold">Select Group Number</label>
                              <FormControl variant="outlined" className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      value={grpNo}
                                      onChange={handleGrpNoChange}
                                      label="grpNo"
                                  >
                                      <MenuItem value="">
                                          <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                              </FormControl></Row>


                          { grpNo != "" ? ( <>

                                  <GrpNumAllocation />
                                  <GenerateGrpIDs />
                                  <NewSubGrpNumAllocation />

                                  <br /><br />
                                  <Row className ="d-flex justify-content-center">
                                      <label className="mt-4 h5 font-weight-bold">Select Sub Group Numbers</label>
                                      <FormControl variant="outlined" className={classes.formControl}>
                                          <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
                                          <Select
                                              labelId="demo-simple-select-outlined-label"
                                              id="demo-simple-select-outlined"
                                              value={subGrpNo}
                                              onChange={handleSubGrpNoChange}
                                              label="subGrpNo"
                                          >
                                              <MenuItem value="">
                                                  <em>None</em>
                                              </MenuItem>
                                              <MenuItem value={10}>Ten</MenuItem>
                                              <MenuItem value={20}>Twenty</MenuItem>
                                              <MenuItem value={30}>Thirty</MenuItem>
                                          </Select>
                                      </FormControl></Row>


                                  {subGrpNo != "" ?  (<>
                                      <SubGrpNumAllocation />
                                      <GenerateSubGrpIDs />
                                  </>) : null}
                              </> )
                              : null}





                          </>) : null}
                 </> )
              : null}

          </Container>
      </div>
  );
}

export default StudentManager;
