import React from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Col} from "reactstrap";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import classNames from 'classnames/bind';

let cx = classNames;
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

export default function SubGrpNumAllocation() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography className={cx(classes.heading, "mt-2")}>Sub Group Numbers Allocation</Typography>
          <Typography className={classes.secondaryHeading}>
            <button type="button" className="btn btn-warning font-weight-bold">Sample Text</button>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="col-md-12 row px-5">
            <div className="input-field col s6">
              <div className="form-group">
                <input type="text" className="form-control" />
              </div>
            </div>
            <Col sm="6 pb-0">
              <Row>
                <Col>
                  <Button variant="contained" color="primary" className="btn-block pr-1">
                    Update
                  </Button>
                </Col>
                <Col>
                  <Button variant="contained" color="secondary" className="btn-block pl-1">
                    Delete
                  </Button>
                </Col>

              </Row>

            </Col>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
