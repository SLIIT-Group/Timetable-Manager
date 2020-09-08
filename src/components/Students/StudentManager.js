import React from 'react';
import { Container } from '@material-ui/core';
import StudentDetails from "./Panels/StudentDetails";
import NewStudentEntry from "./Panels/NewStudentEntry";
import UpdateDelete from "./Panels/UpdateDelete";
import { makeStyles } from '@material-ui/core/styles';

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
              <StudentDetails />
              <NewStudentEntry />
              <UpdateDelete />
          </Container>
      </div>
  );
}

export default StudentManager;
