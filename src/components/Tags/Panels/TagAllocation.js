import React from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Col} from "reactstrap";
import Button from "@material-ui/core/Button";
import Row from "react-bootstrap/Row";
import classNames from 'classnames/bind';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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

export default function TagAllocation() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [tag, setTag] = React.useState('');
  console.log(tag);
  const handleTagChange = (event) => {
    setTag(event.target.value);
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
            <Typography className={cx(classes.heading, "mt-2")}>View and Edit Tag</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <>
              <div className="col-md-12 row px-5">

                <div className="row col-md-12">
                  <Col sm="6 pb-0">
                    <label className="mt-3 h5 font-weight-bold">Select Tag :</label>
                  </Col>
                  <div className="input-field col s6 d-flex flex-column">
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={tag}
                          onChange={handleTagChange}
                          label="tag"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>


                <div className="row col-md-12 mt-3">

                  <div className="input-field col s6">
                    <div className="form-group">
                      <input type="text" className="form-control" value={tag} onChange=""/>
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

              </div>
            </>


          </AccordionDetails>
        </Accordion>
      </div>
  );
}
