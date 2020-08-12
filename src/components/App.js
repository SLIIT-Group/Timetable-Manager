import React from 'react';
import SideNav from './Navigation/SideNav';
import ExpansionPanel from './ExpansionPanel/ExpansionPanel';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <div className='app'>
      <SideNav></SideNav>
      <Container>
        <ExpansionPanel ></ExpansionPanel>
        <ExpansionPanel></ExpansionPanel>
      </Container>
    </div>
  );
};

export default App;
