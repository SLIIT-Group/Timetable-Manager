import React, {useEffect, useState} from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import {Col} from "reactstrap";
import Button from "@material-ui/core/Button";
import classNames from 'classnames/bind';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Row from "react-bootstrap/Row";
import axios from "axios";
import swal from "sweetalert";

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
  const handleYrSemChange = (event) => {
    setYrSem(event.target.value);
  };


  const [prog, setProg] = React.useState('');
  const handleProgChange = (event) => {
    setProg(event.target.value);
  };

  const [grpNo, setGrpNo] = React.useState('');
  const [newGrpNo, setNewGrpNo] = React.useState('');
  const handleGrpNoChange = (event) => {
    setGrpNo(event.target.value);
    setNewGrpNo(event.target.value);
  };
  const handleNewGrpNoChange = (event) => {
    setNewGrpNo(event.target.value);
  };


  const [yrList, setYrList] = useState([]);
  const [progList, setProgList] = useState([]);
  const [grpList, setGrpList] = useState([]);

  useEffect(() => {
    axios
        .post("http://localhost:5000/api/students/view/academicYrSem")
        .then((res) => {
          setYrList(res.data);
        });

  },[]);
  useEffect(() => {
    const req = {
      academicYrSem: yrSem,
    };
    axios
        .post("http://localhost:5000/api/students/view/programme",req)
        .then((res) => {
          setProgList(res.data);
        });

  },[yrSem]);
  useEffect(() => {
    const req = {
      academicYrSem: yrSem,
      programme: prog,

    };
    axios
        .post("http://localhost:5000/api/students/view/grpNo",req)
        .then((res) => {
          setGrpList(res.data);
        });

  },[prog,grpNo,newGrpNo]);

  const deleteStudent = () => {
    const req = {
      prevAcademicYrSem: yrSem,
      prevProgramme: prog,
      prevGrpNo: grpNo,
    };

    axios.post(`http://localhost:5000/api/students/delete/grpNo`, req).then((res) => {
      if (res.data.success) {
        swal("Unsuccessful", "Student Entry Updating Failed", "error");
      }else{
        swal("Successful", "Student Entry Update Successful", "success");
      }
    });
    setYrSem("");
    setProg("");
    setGrpNo("")


  };



  return (

          <>
            <div className="col-md-12 row px-5">

              <div className="row col-md-12">
                <Col sm="6 pb-0">
                  <label className="mt-3 h5 font-weight-bold">Academic Year and Semester :</label>
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
                      {yrList.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="row col-md-12 mt-3">
                <Col sm="6 pb-0">
                  <label className="mt-3 h5 font-weight-bold">Programme :</label>
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
                      {progList.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>


              <div className="row col-md-12 mt-3">
                <Col sm="6 pb-0">
                  <label className="mt-3 h5 font-weight-bold">Group ID :</label>
                </Col>
                <div className="input-field col s6 d-flex flex-column">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={grpNo}
                        onChange={handleGrpNoChange }
                        label="grpNo"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {grpList.map((item) => (
                          <MenuItem value={item}>{yrSem+"."+prog+"."+item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>


              <div className="row col-md-12 mt-3">

                <div className="input-field col s6">

                </div>
                <Col sm="6 pb-0">
                  <Row>
                    <Col>
                      <Button variant="contained" color="secondary" className="btn-block pl-1" onClick={deleteStudent}>
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
