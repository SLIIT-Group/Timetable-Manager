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

  return (
      <div style={{ textAlign: 'center' }}>
          <Container>
              <StudentDetails />
              <NewStudentEntry />
              <UpdateDelete />
          </Container>
      </div>
  );
}

export default StudentManager;
