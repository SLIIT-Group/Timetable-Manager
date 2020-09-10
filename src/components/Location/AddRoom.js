import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px",
    marginLeft: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 200,
    padding: 0,
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function AddRoom(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [table, setTable] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [buildings, setBuilding] = useState([]);
  const [building_room, setBuilding_room] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [number, setNumber] = useState("");
  const [building_id, setBuildingId] = useState();
  const [checkArray, setCheckArray] = useState(false);
  const [toggle, setToggle] = React.useState({
    value: "Add",
    isEdit: true,
  });

  const [block, setBlock] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
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
    axios

      .get(`http://localhost:5000/api/room/`) //get data from userID
      .then((res) => {
        setBuilding_room(res.data);

        setSearchFilter(res.data); //save retrieved data to the hook
      });
  }, [expanded, table]);

  const onClick = (id) => {
    setNumber(id);
    building_room.map((item) => {
      if (item._id == id) {
        return (
          setRoom(item.Room),
          setCapacity(item.Capacity),
          setBlock(item.Building)
        );
      }
    });

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

  const deleteRoom = (id) => {
    setTable(false);
    axios
      .delete(`http://localhost:5000/api/room/remove/${id}`)
      .then((res) => {
        NotificationManager.info("Item is Successfully deleted", "", 3000);
        setTable(true);
      })
      .catch((err) => console.log("Error"));
  };

  const addRoom = (e) => {
    setTable(false);
    e.preventDefault();
    setRoom("");
    setCapacity("");
    if (toggle.value === "Save") {
      setToggle({
        value: "Add",
        isEdit: false,
      });
      buildings.map((item) => {
        if (item.building == block) {
          return setBuildingId(item._id);
        }
      });
      const updateBuilding = {
        Building: block,
        Room: room,
        Capacity: capacity,
        Building_id: building_id,
      };
      axios

        .post(`http://localhost:5000/api/room/update/${number}`, updateBuilding) //get data from userID
        .then((res) => {
          NotificationManager.info("Item is Successfully updated", "", 3000); //save retrieved data to the hook
          setTable(true);
          setBlock("");
        });
      setInput("");
    } else {
      setInput("");

      const room_name = {
        Building: block,
        Room: room,
        Capacity: capacity,
        Building_id: building_id,
      };

      if (checkArray) {
        NotificationManager.warning(
          "Warning message",
          "Room is already allocated for building",
          3000
        );
      } else {
        axios
          .post("http://localhost:5000/api/room/add", room_name)
          .then((res) => {
            if (res.data.success == true) {
              NotificationManager.success("Success message", "Room Added");
              setBlock("");
              setTable(true);
            } else {
              NotificationManager.warning(
                "Warning message",
                "Room is already there",
                3000
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    building_room.map((item) => {
      if (item.Building == block && item.Room == room) {
        return setCheckArray(true);
      } else {
        return setCheckArray(false);
      }
    });
  }, [block, room]);

  useEffect(() => {
    buildings.map((item) => {
      if (item.building == block) {
        return setBuildingId(item._id);
      }
    });
  }, [block]);

  useEffect(() => {
    const results = building_room.filter((roomName) =>
      roomName.Room.toLowerCase().includes(search)
    );
    setSearchFilter(results);
  }, [search]);

  const check = (e) => {
    try {
      setCapacity(parseInt(e.target.value));
    } catch (error) {
      NotificationManager.warning(
        "Warning message",
        "Capacity should be a number",
        3000
      );
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <Accordion
          style={
            expanded
              ? { backgroundColor: "#f5f5f5" }
              : { backgroundColor: "#3f51b5", color: "#fff" }
          }
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Add Room</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "5px solid #DADADA",
                  borderRadius: 30,
                  paddingLeft: 30,
                  paddingBottom: 10,
                  minWidth: 250,
                  width: "100%",
                  flex: 1,
                }}
              >
                <FormControl
                  className={classes.formControl}
                  style={{ marginLeft: 5, marginTop: 20 }}
                >
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ marginLeft: 7 }}
                  >
                    Building
                  </InputLabel>
                  <Select
                    variant="filled"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={block}
                    style={{ width: "150px" }}
                    disabled={!buildings.length}
                    onChange={(event) => setBlock(event.target.value)}
                  >
                    {buildings.map((option) => (
                      <MenuItem key={option._id} value={option.building}>
                        {option.building}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="standard-secondary"
                  label="Add a Room"
                  value={room}
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                />
                <TextField
                  id="standard-secondary"
                  label="Capacity"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 10, marginLeft: 50 }}
                  disabled={buildings.length == 0 || !room || !capacity}
                  onClick={addRoom}
                >
                  {toggle.value}
                </Button>
              </form>
              <div
                style={{
                  flex: 5,
                  minWidth: 300,
                  paddingLeft: 50,
                }}
              >
                {building_room.length !== 0 ? (
                  <Paper
                    component="form"
                    className={classes.root}
                    style={{
                      justifyContent: "center",
                      borderRadius: 20,
                      textAlign: "center",
                      borderBottom: "2px solid #EC4C90",
                      maxWidth: 500,
                      display: "flex",
                      flexDirection: "row",
                      align: "space-between",
                      paddingLeft: 25,
                    }}
                  >
                    <InputBase
                      className={classes.input}
                      placeholder="Search Rooms"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      style={{ flex: 1 }}
                    />
                    <IconButton
                      className={classes.iconButton}
                      aria-label="search"
                    >
                      <SearchIcon disabled style={{ flex: 1 }} />
                    </IconButton>
                  </Paper>
                ) : (
                  <h1></h1>
                )}

                {building_room.length !== 0 ? (
                  <Grid
                    style={{
                      flex: 5,
                      maxWidth: 500,
                    }}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                        style={{
                          borderRadius: 20,
                          borderBottom: "3px solid #3f51b5",
                        }}
                      >
                        <TableHead
                          style={{
                            backgroundColor: "theme.palette.common.black",
                            color: "theme.palette.common.white",
                          }}
                        >
                          <TableRow align="center">
                            <StyledTableCell align="center">
                              Building
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Room
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Capacity
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Delete
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Edit
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        {!search ? (
                          <TableBody>
                            {building_room.map((item) => (
                              <TableRow hover key={item._id}>
                                <TableCell align="center">
                                  {item.Building}
                                </TableCell>
                                <TableCell align="center">
                                  {item.Room}
                                </TableCell>
                                <TableCell align="center">
                                  {item.Capacity}
                                </TableCell>
                                <TableCell align="center">
                                  <DeleteIcon
                                    onClick={() => {
                                      deleteRoom(item._id);
                                    }}
                                  >
                                    {" "}
                                  </DeleteIcon>
                                </TableCell>
                                <TableCell align="center">
                                  {" "}
                                  <EditIcon
                                    onClick={() => {
                                      onClick(item._id);
                                    }}
                                  ></EditIcon>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        ) : (
                          <TableBody>
                            {searchFilter.map((item) => (
                              <TableRow hover key={item._id}>
                                <TableCell align="center">
                                  {item.Building}
                                </TableCell>
                                <TableCell align="center">
                                  {item.Room}
                                </TableCell>
                                <TableCell align="center">
                                  {item.Capacity}
                                </TableCell>
                                <TableCell align="center">
                                  <DeleteIcon
                                    onClick={() => {
                                      deleteRoom(item._id);
                                    }}
                                  >
                                    {" "}
                                  </DeleteIcon>
                                </TableCell>
                                <TableCell align="center">
                                  {" "}
                                  <EditIcon
                                    onClick={() => {
                                      onClick(item._id);
                                    }}
                                  ></EditIcon>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
                  </Grid>
                ) : (
                  <h1 style={{ fontWeight: "bolder", paddingLeft: 8 }}>
                    No data
                  </h1>
                )}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </Container>
      <NotificationContainer />
    </div>
  );
}

export default AddRoom;
