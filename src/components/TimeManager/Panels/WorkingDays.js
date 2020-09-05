import React from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container } from '@material-ui/core';
import AddDays from '../Forms/AddDays';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
function TimeSlot(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [allocations, setAllocations] = useState([]);
  const [counter, setCounter] = useState(0);

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
              : { backgroundImage: 'linear-gradient(#eef2f3, #8e9eab)' }
          }
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography className={classes.heading}>Working Days</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddDays
              allocations={allocations}
              counter={counter}
              setCounter={setCounter}
            ></AddDays>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default TimeSlot;
