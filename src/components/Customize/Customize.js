import React from 'react';
import { Container } from '@material-ui/core';
import ShouldNotOverlap from "./Panels/ShouldNotOverlap";
import Consecutive from "./Panels/Consecutive";
import NotAvailable from "./Panels/NotAvailable";
import Parallel from "./Panels/Parallel";
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

function Customize() {

  return (
      <div style={{ textAlign: 'center' }}>
          <Container>
              <NotAvailable />
              <Consecutive />
              <Parallel />
              <ShouldNotOverlap />

          </Container>
      </div>
  );
}

export default Customize;
