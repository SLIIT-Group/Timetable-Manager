import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const currencies = [
  {
    value: "USD",
    label: "$",
    name: "Hello",
  },
  {
    value: "EUR",
    label: "€",
    name: "Bro",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    margin: "10px",
    marginRight: "100px",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Rooms() {
  const classes = useStyles();
  const [buildings, setBuilding] = useState([]);
  const [input, setInput] = useState("");
  const [search, setsearch] = useState("");
  const [toggle, setToggle] = React.useState({
    value: "Add",
    isEdit: true,
  });
  const onClick = (e) => {
    if (toggle.value === "Add") {
      setToggle({
        value: "Save",
        isEdit: false,
      });
    } else {
      setToggle({
        value: "Add",
        isEdit: true,
      });
    }
  };

  const addBuilding = (e) => {
    e.preventDefault();
    if (toggle.value === "Save") {
      setToggle({
        value: "Add",
        isEdit: false,
      });
    } else {
      setBuilding([...buildings, input]);
      setInput("");
    }
  };

  return (
    <div className={classes.layout}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Add Room for tag</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ marginLeft: "20px" }}>
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </div>
                <button
                  disabled={!input}
                  type="submit"
                  className="btn btn-info mb-2"
                  onClick={addBuilding}
                >
                  {toggle.value}
                </button>
              </form>
              <div
                style={{
                  border: "3px solid #dff2ed",
                  padding: "25px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <div className={classes.root}>
                  <div className="main">
                    <div className="input-group">
                      <input
                        type="text"
                        className="input"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <br />
                  <table
                    className="table table-striped table-info"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Subject</th>
                        <th scope="col">Room</th>
                        <th scope="col">Tag</th>
                        <th scope="col" colSpan="2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {buildings.map((item) => (
                      <tbody>
                        <tr>
                          <th scope="row">{item}</th>
                          <td>Test</td>
                          <td>test</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              onClick={onClick}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <br />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Add Room for Lecturer
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ marginLeft: "20px" }}>
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </div>
                <button
                  disabled={!input}
                  type="submit"
                  className="btn btn-info mb-2"
                  onClick={addBuilding}
                >
                  {toggle.value}
                </button>
              </form>
              <div
                style={{
                  border: "3px solid #dff2ed",
                  padding: "25px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <div className={classes.root}>
                  <div className="main">
                    <div className="input-group">
                      <input
                        type="text"
                        className="input"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <br />
                  <table
                    className="table table-striped table-info"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Lecturer</th>
                        <th scope="col">Room</th>
                        <th scope="col">Tag</th>
                        <th scope="col" colSpan="2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {buildings.map((item) => (
                      <tbody>
                        <tr>
                          <th scope="row">{item}</th>
                          <td>Test</td>
                          <td>test</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              onClick={onClick}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Add Room for groups
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ marginLeft: "80px" }}>
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </div>
                <button
                  disabled={!input}
                  type="submit"
                  className="btn btn-info mb-2"
                  onClick={addBuilding}
                >
                  {toggle.value}
                </button>
              </form>
              <div
                style={{
                  border: "3px solid #dff2ed",
                  padding: "25px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <div className={classes.root}>
                  <div className="main">
                    <div className="input-group">
                      <input
                        type="text"
                        className="input"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <br />
                  <table
                    className="table table-striped table-info"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Room</th>
                        <th scope="col">Group</th>
                        <th scope="col" colSpan="2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {buildings.map((item) => (
                      <tbody>
                        <tr>
                          <th scope="row">{item}</th>
                          <td>Test</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              onClick={onClick}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Add Room for session
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ marginLeft: "20px" }}>
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "160px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </div>
                <button
                  disabled={!input}
                  type="submit"
                  className="btn btn-info mb-2"
                  onClick={addBuilding}
                >
                  {toggle.value}
                </button>
              </form>
              <div
                style={{
                  border: "3px solid #dff2ed",
                  padding: "25px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <div className={classes.root}>
                  <div className="main">
                    <div className="input-group">
                      <input
                        type="text"
                        className="input"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <br />
                  <table
                    className="table table-striped table-info"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Session</th>
                        <th scope="col">Room</th>
                        <th scope="col" colSpan="2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {buildings.map((item) => (
                      <tbody>
                        <tr>
                          <th scope="row">{item}</th>
                          <td>Test</td>
                          <td>test</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              onClick={onClick}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Allocate Time Restriction
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ marginLeft: "20px" }}>
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      label="Buildings"
                      variant="outlined"
                      disabled={!buildings.length}
                      style={{ width: "130px", marginLeft: "10px" }}
                    >
                      {buildings.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </div>
                <button
                  disabled={!input}
                  type="submit"
                  className="btn btn-info mb-2"
                  onClick={addBuilding}
                >
                  {toggle.value}
                </button>
              </form>
              <div
                style={{
                  border: "3px solid #dff2ed",
                  padding: "25px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <div className={classes.root}>
                  <div className="main">
                    <div className="input-group">
                      <input
                        type="text"
                        className="input"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <br />
                  <table
                    className="table table-striped table-info"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Time Slot</th>
                        <th scope="col">Room</th>
                        <th scope="col" colSpan="2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {buildings.map((item) => (
                      <tbody>
                        <tr>
                          <th scope="row">{item}</th>
                          <td>Test</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              onClick={onClick}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
