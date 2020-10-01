import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Grid, Paper, Button } from '@material-ui/core';
import GroupDropDown from '../DropDowns/GroupDropDown';
import axios from 'axios';
import swal from 'sweetalert';

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

const buttonStyle = {
  margin: '20px',
  width: '50%',
};

function CreatePanel({ counter, setCounter }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [groupId, setGroupId] = useState('');
  const [timetable, setTimeTable] = useState([]);

  useEffect(() => {}, [timetable]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const createTimetable = () => {
    axios
      .get(`http://localhost:5000/api/timetable/create/${groupId}`)
      .then((res) => {
        console.log('From createTimetable');
        setTimeTable(res.data);
        swal('Successful', `Timetable created for ${groupId}`, 'success');
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
        swal(
          'Unsuccessful',
          'Creation failed. Please check if timetable already exists or sufficient time is allocated',
          'error'
        );
      });
  };

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
              Create A Timetable
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                  <GroupDropDown
                    groupId={groupId}
                    setGroupId={setGroupId}
                  ></GroupDropDown>
                  <Button
                    style={buttonStyle}
                    value='Create'
                    variant='contained'
                    color='primary'
                    width='block'
                    onClick={createTimetable}
                  >
                    Create
                  </Button>
                </Paper>
              </Grid>
              {/* content */}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default CreatePanel;
