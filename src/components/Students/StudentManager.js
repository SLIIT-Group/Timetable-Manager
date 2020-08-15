import React from 'react';
import { Container } from '@material-ui/core';
import AcademicYrSem from "./Panels/AcademicYrSem";
import GenerateGrpIDs from "./Panels/GenerateGrpIDs";
import GenerateSubGrpIDs from "./Panels/GenerateSubGrpIDs";
import GrpNumAllocation from "./Panels/GrpNumAllocation";
import ProgramAllocation from "./Panels/ProgramAllocation";
import SubGrpNumAllocation from "./Panels/SubGrpNumAllocation";
import ViewStudentDetails from "./Panels/ViewStudentDetails";

function StudentManager() {
  return (
      <div style={{ textAlign: 'center' }}>
          Student Manager
          <Container>
              <AcademicYrSem />
              <GenerateGrpIDs />
              <GenerateSubGrpIDs />
              <GrpNumAllocation />
              <ProgramAllocation />
              <SubGrpNumAllocation />
              <ViewStudentDetails />
          </Container>
      </div>
  );
}

export default StudentManager;
