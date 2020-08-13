import React from 'react';
import ExpansionPanel from '../ExpansionPanel/ExpansionPanel';
import { Container } from '@material-ui/core';

function SessionManager() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>Session Manager</div>
      <Container>
        <ExpansionPanel></ExpansionPanel>
      </Container>
    </div>
  );
}

export default SessionManager;
