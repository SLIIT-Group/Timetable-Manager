import React from 'react';
import { Container } from '@material-ui/core';
import AcademicYrSem from "./Panels/AcademicYrSem";
import GrpIDs from "./Panels/GrpIDs";
import SubGrpIDs from "./Panels/SubGrpIDs";
import GrpNum from "./Panels/GrpNum";
import Programme from "./Panels/Programme";
import SubGrpNum from "./Panels/SubGrpNum";
import ViewStudentDetails from "./Panels/ViewStudentDetails";
import NewStudentEntry from "./Panels/NewStudentEntry";
import SearchStudentDetails from "./Panels/SearchStudentDetails";
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
              <SearchStudentDetails />
              <NewStudentEntry />
              <AcademicYrSem />
              <Programme />
              <GrpNum />
              <GrpIDs />
              <SubGrpNum />
              <SubGrpIDs />
          </Container>
      </div>
  );
}

export default StudentManager;
