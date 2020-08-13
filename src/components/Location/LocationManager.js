import React from 'react';
import ExpansionPanel from '../ExpansionPanel/ExpansionPanel';
import { Container } from '@material-ui/core';

function LocationManager() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>Location Manager</div>
      <Container>
        <ExpansionPanel></ExpansionPanel>
      </Container>
    </div>
  );
}

export default LocationManager;
