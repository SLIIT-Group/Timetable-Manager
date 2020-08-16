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

function StudentManager() {
  return (
      <div style={{ textAlign: 'center' }}>
          Student Manager
          <Container>
              <ViewStudentDetails />
              <NewAcademicYrSem />
              <AcademicYrSem />
              <NewProgramAllocation />
              <ProgramAllocation />
              <NewSubGrpNumAllocation />
              <GrpNumAllocation />
              <GenerateGrpIDs />
              <NewSubGrpNumAllocation />
              <SubGrpNumAllocation />
              <GenerateSubGrpIDs />
          </Container>
      </div>
  );
}

export default StudentManager;
