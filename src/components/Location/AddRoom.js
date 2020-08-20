import React, { useState, useEffect } from "react";
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

export default function AddRoom() {
  const classes = useStyles();
  const [buildings, setBuilding] = useState([]);
  const [input, setInput] = useState("");
  const [block, setBlock] = useState("");
  const [number, setNumber] = useState("");
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState("");
  const [buildings_room, setBuilding_room] = useState([]);
  const [data, setData] = useState({});
  const [search, setsearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [toggle, setToggle] = React.useState({
    value: "Add",
    isEdit: true,
  });
  const onClick = (e) => {
    // console.log(e.target.value);
    // axios

    // axios
    //   .get(`http://localhost:5000/api/room/${e.target.value}`) //get data from userID
    //   .then((res) => {
    //     setData(res.data); //save retrieved data to the hook
    //     console.log(data);
    //     setBlock(data[0].Building),
    //       setRoom(data[0].Room),
    //       setCapacity(data[0].Capacity);
    //   });
    fetch(`http://localhost:5000/api/room/${e.target.value}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setBlock(result.Building),
            setRoom(result.Room),
            setCapacity(result.Capacity);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );

    setInput("");
    console.log(e.target.value);
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
    axios

      .get(`http://localhost:5000/api/building/`) //get data from userID
      .then((res) => {
        setBuilding(res.data); //save retrieved data to the hook
      });

    axios

      .get(`http://localhost:5000/api/room/`) //get data from userID
      .then((res) => {
        setBuilding_room(res.data); //save retrieved data to the hook
      });
  });

  const deleteRoom = (e) => {
    axios
      .delete(`http://localhost:5000/api/room/remove/${e.target.value}`)
      .then((res) => {
        NotificationManager.info("Item is Successfully deleted", "", 3000);

        console.log(res.data);
      })
      .catch((err) => console.log("Error"));
  };

  const addRoom = (e) => {
    e.preventDefault();
    setRoom("");
    setCapacity("");
    if (toggle.value === "Save") {
      setToggle({
        value: "Add",
        isEdit: false,
      });
      const updateBuilding = {
        Building: block,
        Room: room,
        Capacity: capacity,
      };
      axios

        .post(`http://localhost:5000/api/room/update/${number}`, updateBuilding) //get data from userID
        .then((res) => {
          NotificationManager.info("Item is Successfully updated", "", 3000); //save retrieved data to the hook
        });
      setInput("");
    } else {
      //setBuilding([...buildings, input]);
      setInput("");
      const room_name = {
        Building: block,
        Room: room,
        Capacity: capacity,
      };

      axios
        .post("http://localhost:5000/api/room/add", room_name)
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

  useEffect(() => {
    fetch(`http://localhost:5000/api/room/search/${search}`)
      .then((res) => res.json())
      .then(
        (result) => {
          const filteredArray = buildings_room.filter((item) => {
            console.log(result);
            return item.Building === result.Building;
          });

          setFilter(filteredArray);
          console.log(filteredArray);
        },
        (error) => {
          //setError(error);
        }
      );
  }, [search]);

  return (
    <div className={classes.layout}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Allocate Rooms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ display: "inline-flex", marginLeft: "50px" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Buildings"
                  variant="outlined"
                  disabled={!buildings.length}
                  style={{ width: "160px" }}
                  onChange={(event) => setBlock(event.target.value)}
                >
                  {buildings.map((option) => (
                    <MenuItem key={option._id} value={option.building}>
                      {option.building}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <div style={{ flexDirection: "column", marginLeft: "30px" }}>
                <p>Room</p>
                <p>Capacity</p>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <input
                  type="text"
                  style={{ width: "70px", borderRadius: "10px" }}
                  value={room}
                  onChange={(event) => setRoom(event.target.value)}
                />
                <br />

                <input
                  type="text"
                  style={{
                    marginTop: "8px",
                    width: "70px",
                    borderRadius: "10px",
                  }}
                  value={capacity}
                  onChange={(event) => setCapacity(event.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              class="btn btn-info"
              style={{
                width: "100px",
                height: "35px",
                textAlign: "center",
                marginLeft: "30px",
                borderRadius: "15px",
                marginTop: "40px",
              }}
              disabled={!room || !capacity || buildings.length === 0}
              onClick={addRoom}
            >
              {toggle.value}
            </button>
            <div style={{ padding: "50px" }}>
              <div className="input-group">
                <input
                  type="text"
                  className="input"
                  style={{ width: "100%" }}
                  onChange={(e) => setsearch(e.target.value)}
                  value={search}
                />
              </div>
              <br />
              {!search ? (
                <table
                  className="table table-striped table-info"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Buildings</th>
                      <th scope="col">Rooms</th>
                      <th scope="col">Room Capacity</th>
                      <th scope="col" colSpan="2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {buildings_room.map((item) => (
                    <tbody>
                      <tr>
                        <th scope="row">{item.Building}</th>
                        <td>{item.Room}</td>
                        <td>{item.Capacity}</td>
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
                            value={item._id}
                            onClick={deleteRoom}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              ) : (
                <table
                  className="table table-striped table-info"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Buildings</th>
                      <th scope="col">Rooms</th>
                      <th scope="col">Room Capacity</th>
                      <th scope="col" colSpan="2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {filter.map((item) => (
                    <tbody>
                      <tr>
                        <th scope="row">{item.Building}</th>
                        <td>{item.Room}</td>
                        <td>{item.Capacity}</td>
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
                            value={item._id}
                            onClick={deleteRoom}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              )}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <NotificationContainer />
    </div>
  );
}
