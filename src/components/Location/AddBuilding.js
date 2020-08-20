import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LocationManager.css";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    margin: "10px",
    marginRight: "10px",
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

export default function AddBuilding() {
  const classes = useStyles();
  const [buildings, setBuilding] = useState([]);
  const [input, setInput] = useState("");
  const [search, setsearch] = useState([]);
  const [number, setNumber] = useState("");
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState("");
  const [data, setData] = useState({});
  const [toggle, setToggle] = React.useState({
    value: "Add",
    isEdit: true,
  });
  const onClick = (e) => {
    fetch(`http://localhost:5000/api/building/${e.target.value}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setInput(result.building);
        },
        (error) => {
          setError(error);
        }
      );

    if (toggle.value === "Add") {
      setToggle({
        value: "Save",
        isEdit: false,
      });

      setNumber(e.target.value);
    } else {
      setToggle({
        value: "Add",
        isEdit: true,
      });

      setNumber(e.target.value);
    }
  };

  useEffect(() => {
    // axios

    //   .get(`http://localhost:5000/api/building/`) //get data from userID
    //   .then((res) => {
    //     setBuilding(res.data); //save retrieved data to the hook
    //   });

    fetch(`http://localhost:5000/api/building/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setBuilding(result);
        },
        (error) => {
          setError(error);
        }
      );
  });

  const deleteBuilding = (e) => {
    axios
      .delete(`http://localhost:5000/api/building/delete/${e.target.value}`)
      .then((res) => {
        NotificationManager.info("Item is Successfully deleted", "", 3000);

        console.log(res.data);
      })
      .catch((err) => console.log("Error"));
    axios
      .delete(`http://localhost:5000/api/room/delete/${e.target.value}`)
      .then((res) => {
        // NotificationManager.info("Item is Successfully deleted", "", 3000);

        console.log(res.data);
      })
      .catch((err) => console.log("Error"));
  };

  const addBuilding = (e) => {
    e.preventDefault();
    if (toggle.value === "Save") {
      setToggle({
        value: "Add",
        isEdit: false,
      });
      const updateBuilding = {
        building: input,
      };
      axios

        .post(
          `http://localhost:5000/api/building/update/${number}`,
          updateBuilding
        ) //get data from userID
        .then((res) => {
          NotificationManager.info("Item is Successfully updated", "", 3000); //save retrieved data to the hook
        });
      setInput("");
    } else {
      //setBuilding([...buildings, input]);
      setInput("");
      const building_names = {
        building: input,
      };

      axios
        .post("http://localhost:5000/api/building/add", building_names)
        .then((res) => {
          if (res.data.success == true) {
            NotificationManager.success("Success message", "Building Added");
            console.log(res.data);
          } else {
            NotificationManager.warning(
              "Warning message",
              "Buiding is already there",
              3000
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
                    id="input"
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
                        <th scope="col">Buildings</th>
                        <th scope="col" colSpan="2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {buildings.map((item) => (
                      <tbody>
                        <tr>
                          <th scope="row">{item.building}</th>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value={item._id}
                              onClick={onClick}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
                              value={item.building}
                              onClick={deleteBuilding}
                            >
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
      <NotificationContainer />
    </div>
  );
}
