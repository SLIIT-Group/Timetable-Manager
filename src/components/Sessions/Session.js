import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Route,
  Link as ReactLink,
  Switch,
} from 'react-router-dom';
import Copyright from '../Commons/Copyright';
import SessionForm from "./SessionForm";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function Session() {
  const classes = useStyles();

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <ReactLink to='/session'>
          <div style={{ marginTop: -30, marginLeft: 20 }}>
            <Button variant='contained' color='secondary'>
              {' '}
              Back{' '}
            </Button>
          </div>
        </ReactLink>

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component='h1' variant='h4' align='center'>
              Session Details
            </Typography>

            <React.Fragment>
              <SessionForm/>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    </div>
  );
}

export default Session;
