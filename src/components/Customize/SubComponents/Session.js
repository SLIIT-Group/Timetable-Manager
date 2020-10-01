import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Col} from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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

export default function Session({keys, setKey}) {
  const classes = useStyles();

  const [lecList, setLecList] = useState([]);
  useEffect(() => {
    axios.get("https://kaalaapi.herokuapp.com/api/sessions")
        .then((response) => {
          setLecList(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, []);


  return (

      <>
        <div className="col-md-12 row px-5">

          <div className="row col-md-12">
            <Col sm="6 pb-0">
              <label className="mt-3 h5 font-weight-bold">Session :</label>
            </Col>
            <div className="input-field col s6 d-flex flex-column">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label px-4">Select</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={keys}
                    onChange={(event) => setKey(event.target.value)}
                    label="lKey"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {lecList.map((item) => (
                      <MenuItem value={item._id+"-"+item.subject+" "+item.tag
                        +" | Sub/Group:"+item.groupId}>{item.subject+" "+item.tag
                      +" | Sub/Group:"+item.groupId}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

        </div>
      </>


  );
}
