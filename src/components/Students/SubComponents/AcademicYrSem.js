import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Col} from "reactstrap";
import Button from "@material-ui/core/Button";
import Row from "react-bootstrap/Row";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import swal from "sweetalert";


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

export default function AcademicYrSem() {
  const classes = useStyles();

  const [yrSem, setYrSem] = React.useState('');
  const [newYrSem, setNewYrSem] = React.useState('');
  const handleYrSemChange = (event) => {
    setYrSem(event.target.value);
    setNewYrSem(event.target.value);
  };
  const handleNewYrSemChange = (event) => {
    setNewYrSem(event.target.value);
  };

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios

        .post("http://localhost:5000/api/students/view/academicYrSem")
        .then((res) => {
          setStudentList(res.data);
        });

  },[yrSem,newYrSem]);
  const deleteStudent = () => {
    const req = {
      academicYrSem: yrSem,
    };

    axios.post(`http://localhost:5000/api/students/delete/academicYrSem`, req).then((res) => {
      if (res.data.success) {
        alert("Student Entry Updating Failed");
      }else{
        alert("Student Entry Update Successful");
      }
    });
    setYrSem("");
    setNewYrSem("");

  };

  const updateStudent = () => {
    const req = {
      prevAcademicYrSem : yrSem,
      academicYrSem: newYrSem,
    };

    axios.post(`http://localhost:5000/api/students/update/academicYrSem`, req).then((res) => {
      if (res.data.success) {
        swal("Unsuccessful", "Student Entry Updating Failed", "error");
      }else{
        swal("Successful", "Student Entry Update Successful", "success");
      }
    });
    setYrSem("");
    setNewYrSem("");

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
                      {studentList.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </div>
              </div>


              <div className="row col-md-12 mt-3">

                <div className="input-field col s6">
                  <div className="form-group">
                    <input type="text" className="form-control" value={newYrSem} onChange={handleNewYrSemChange}/>
                  </div>
                </div>
                <Col sm="6 pb-0">
                  <Row>
                    <Col>
                      <Button variant="contained" color="primary" className="btn-block pr-1" onClick={updateStudent}>
                        Update
                      </Button>
                    </Col>
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
