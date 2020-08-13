import React from 'react';
import ExpansionPanel from '../ExpansionPanel/ExpansionPanel';
import { Container } from '@material-ui/core';

function Lecturer() {
  return (
    <div style={{ textAlign: 'center' }}>
      Lecturer
      <Container>
        <ExpansionPanel></ExpansionPanel>
      </Container>
    </div>
  );
}

export default Lecturer;
