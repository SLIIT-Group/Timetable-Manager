import React, { useEffect, useState } from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Grid, Paper, Divider } from '@material-ui/core';
import AddSlot from '../Forms/AddSlot';
import axios from 'axios';
import Slots from '../Tables/Slots';

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
}));

function TimeSlot() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [slots, setSlots] = useState([]);
  const [counter, setCounter] = useState(0);

  const getAllSlots = () => {
    axios
      .get(`http://localhost:5000/api/slot`)
      .then((res) => {
        console.log(res.data);
        setSlots(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllSlots();
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
            <Typography className={classes.heading}>
              Time Slot Allocation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <AddSlot counter={counter} setCounter={setCounter}></AddSlot>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Slots
                    counter={counter}
                    setCounter={setCounter}
                    slots={slots}
                  ></Slots>
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
