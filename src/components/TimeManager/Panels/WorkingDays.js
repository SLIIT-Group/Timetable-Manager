import React from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Grid, Paper, Divider, Fade } from '@material-ui/core';
import Add from '../Forms/Add';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Allocations from '../Tables/Allocations';
import Edit from '../Forms/Edit';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '10px',
    marginRight: '10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
function TimeSlot(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [allocations, setAllocations] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const initialState = { day: '', hours: '' };
  const [editingAllocation, setEditingAllocation] = useState(initialState);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getAllAllocations = () => {
    axios
      .get(`http://localhost:5000/api/day`)
      .then((res) => {
        console.log(res.data);
        setAllocations(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllAllocations();
  }, [counter]);

  return (
    <div className={classes.root}>
      <Container>
        <Accordion
          style={
            expanded
              ? { backgroundColor: '#f5f5f5' }
              : { backgroundColor: '#3f51b5', color: '#fff' }
          }
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography className={classes.heading}>Working Days</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                {isEditing ? (
                  <Paper className={classes.paper}>
                    {' '}
                    <Fade in={false}>
                      <Edit
                        allocations={allocations}
                        counter={counter}
                        setCounter={setCounter}
                        setIsEditing={setIsEditing}
                        editingAllocation={editingAllocation}
                      ></Edit>
                    </Fade>
                  </Paper>
                ) : (
                  <Paper className={classes.paper}>
                    {' '}
                    <Add
                      allocations={allocations}
                      counter={counter}
                      setCounter={setCounter}
                    ></Add>
                  </Paper>
                )}
              </Grid>
              <Grid item xs={12} md={9}>
                <Paper className={classes.paper}>
                  <Allocations
                    counter={counter}
                    setCounter={setCounter}
                    allocations={allocations}
                    setIsEditing={setIsEditing}
                    setEditingAllocation={setEditingAllocation}
                  ></Allocations>
                </Paper>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default TimeSlot;
