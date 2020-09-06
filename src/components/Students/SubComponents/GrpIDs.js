import React from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import {Col} from "reactstrap";
import Button from "@material-ui/core/Button";
import classNames from 'classnames/bind';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Row from "react-bootstrap/Row";

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

export default function GrpIDs() {
  const classes = useStyles();

  const [yrSem, setYrSem] = React.useState('');
  console.log(yrSem);
  const handleYrSemChange = (event) => {
    setYrSem(event.target.value);
  };

  const [prog, setProg] = React.useState('');
  console.log(prog);
  const handleProgChange = (event) => {
    setProg(event.target.value);
  };

  const [grpID, setGrpID] = React.useState('');
  console.log(grpID);
  const handleGrpIDChange = (event) => {
    setGrpID(event.target.value);
  };

  return (

          <>
            <div className="col-md-12 row px-5">

              <div className="row col-md-12">
                <Col sm="6 pb-0">
                  <label className="mt-3 h5 font-weight-bold">Select Academic Year and Semester :</label>
                </Col>
                <div className="input-field col s6 d-flex flex-column">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={yrSem}
                        onChange={handleYrSemChange}
                        label="yrSem"
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
                <Col sm="6 pb-0">
                  <label className="mt-3 h5 font-weight-bold">Select Programme :</label>
                </Col>
                <div className="input-field col s6 d-flex flex-column">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={prog}
                        onChange={handleProgChange }
                        label="prog"
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
                <Col sm="6 pb-0">
                  <label className="mt-3 h5 font-weight-bold">Select Group ID :</label>
                </Col>
                <div className="input-field col s6 d-flex flex-column">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={grpID}
                        onChange={handleGrpIDChange }
                        label="grpID"
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
                    <input type="text" className="form-control" value={grpID} onChange=""/>
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

  );
}
