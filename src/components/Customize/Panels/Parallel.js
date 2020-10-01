import React, {useState} from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParallelTable from "../SubComponents/ParallelTable";
import ConsecutiveTable from "../SubComponents/ConsecutiveTable";
import Row from "react-bootstrap/Row";


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

export default function Parallel() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div className={classes.root}>
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
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography className={classes.heading}>Parallel Sessions</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Row className="p-0 m-0  col-md-12 d-flex bd-highlight justify-content-center flex-column">
            <ParallelTable expanded={expanded}/>
          </Row>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
