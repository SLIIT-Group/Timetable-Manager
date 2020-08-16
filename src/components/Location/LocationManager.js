import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px",
    marginRight: "10px",
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

export default function LocationManager() {
  const classes = useStyles();
  const [buildings, setBuilding] = useState([]);
  const [input, setInput] = useState("");
  const [search, setsearch] = useState("");

  const addBuilding = (e) => {
    e.preventDefault();
    setBuilding([...buildings, input]);
    setInput("");
  };

  return (
    <div className={classes.root}>
      <Accordion style={{ backgroundColor: "#e8dddc" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Allocate Buildings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ marginLeft: "100px" }}>
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <button
                  disabled={!input}
                  type="submit"
                  className="btn btn-info mb-2"
                  onClick={addBuilding}
                >
                  Add
                </button>
              </form>

              <div className={classes.root}>
                <div className="main">
                  <div className="input-group">
                    <input type="text" className="form-control" />
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <table
                  className="table table-striped table-info"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Buildings</th>
                      <th scope="col" colSpan="2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {buildings.map((item) => (
                    <tbody>
                      <tr>
                        <th scope="row">{item}</th>
                        <td>
                          <button type="button" class="btn btn-warning">
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
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Accordion style={{ backgroundColor: "#fae5e3" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Allocate Rooms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
