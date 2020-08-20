import React, {useEffect, useState} from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import {Col} from "reactstrap";
import Button from "@material-ui/core/Button";
import axios from "axios";

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

export default function NewTagAllocation() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [tag, setTag] = useState('');
  function handleTagChange(e) {
    setTag(e.target.value)

  }

  const saveTag = () => {
    const req = {
      tag: tag,
    };

    axios.post("http://localhost:5000/api/tags/add", req).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        alert("Tag Saved Successfully");
      }else{
        alert("Tag Saving Failed");
      }
    });
    setTag("");
  };

  const resetTag = () => {
    setTag("");
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
          <Typography className={classes.heading}>Add New Tag</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <>
            <div className="col-md-12 row px-5">

              <div className="row col-md-12">
                <Col sm="6 pb-0">
                  <div className="h5 font-weight-bold text-center pt-4">
                    Enter New Tag Name :
                  </div>
                </Col>
                <div className="input-field col s6">
                  <TextField
                      name="tag"
                      value={tag}
                      onChange={handleTagChange}
                      id="standard-full-width"
                      label="Enter New Tag Name"
                      style={{ margin: 8 }}
                      placeholder="Eg: Lab, Lecture"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                  />
                </div>
              </div>


              <div className="col-md-12 row px-1 mt-3">
                <Col sm="6 pb-0">
                  <Button variant="contained" color="secondary" className="btn-block" onClick={resetTag}>
                    Reset
                  </Button>
                </Col>
                <Col sm="6 pb-0">
                  <Button variant="contained" color="primary" className="btn-block" onClick={saveTag}>
                    Add
                  </Button>
                </Col>
              </div>
            </div>
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
