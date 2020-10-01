import "react-dropdown/style.css";
import "react-notifications/lib/notifications.css";

import { Button, Container, Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

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

function Room_group(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [table, setTable] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [building_room, setBuilding_room] = useState([]);
  const [room, setRoom] = useState("");
  const [number, setNumber] = useState("");
  const [checkArray, setCheckArray] = useState(false);
  const [toggle, setToggle] = React.useState({
    value: "Add",
    isEdit: true,
  });
  const [room_group, setRoomGroup] = useState([]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetch(`https://kaalaapi.herokuapp.com/api/students/all`)
      .then((res) => res.json())
      .then(
        (result) => {
          setGroups(result);
        },
        (error) => {
          setError(error);
        }
      );
    axios.get(`https://kaalaapi.herokuapp.com/api/room/`).then((res) => {
      setBuilding_room(res.data);
    });

    axios.get(`https://kaalaapi.herokuapp.com/api/room_group/`).then((res) => {
      setRoomGroup(res.data);
      setSearchFilter(res.data);
    });
  }, [expanded, table]);

  const onClick = (id) => {
    setNumber(id);

    room_group.map((item) => {
      if (item._id == id) {
        return setGroup(item.group), setRoom(item.room);
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
      .delete(`https://kaalaapi.herokuapp.com/api/room_group/remove/${id}`)
      .then((res) => {
        NotificationManager.info("Item is Successfully deleted", "", 3000);
        setTable(true);
      })
      .catch((err) => console.log("Error"));
  };

  const addRoom = (e) => {
    setTable(false);
    e.preventDefault();

    if (toggle.value === "Save") {
      setToggle({
        value: "Add",
        isEdit: false,
      });

      const update_tagRoom = {
        group: group,
        room: room,
      };
      if (!checkArray) {
        axios
          .post(
            `https://kaalaapi.herokuapp.com/api/room_group/update/${number}`,
            update_tagRoom
          )
          .then((res) => {
            NotificationManager.info("Item is Successfully updated", "", 3000);
            setTable(true);
            setGroup("");
            setRoom("");
          });
      } else {
        NotificationManager.warning("Item is Already There", "", 3000);
        setGroup("");
        setRoom("");
      }
    } else {
      const data = {
        group: group,
        room: room,
      };

      if (checkArray) {
        NotificationManager.warning(
          "Warning message",
          "Room is already allocated",
          3000
        );
        setGroup("");
        setRoom("");
      } else {
        axios
          .post("https://kaalaapi.herokuapp.com/api/room_group/add", data)
          .then((res) => {
            if (res.data.success == true) {
              NotificationManager.success("Success message", "Room Added");
              setGroup("");
              setRoom("");
              setTable(true);
            } else {
              NotificationManager.warning(
                "Warning message",
                "Room is already there",
                3000
              );
              setGroup("");
              setRoom("");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    if (toggle.value === "Add") {
      room_group.map((item) => {
        if (item.group == group) {
          return setCheckArray(true);
        } else {
          return setCheckArray(false);
        }
      });
    } else {
      room_group.map((item) => {
        if (item.group == group && item.room == room) {
          return setCheckArray(true);
        } else {
          return setCheckArray(false);
        }
      });
    }
  }, [group, room]);

  useEffect(() => {
    const results = room_group.filter((data) =>
      data.group.toLowerCase().includes(search)
    );
    setSearchFilter(results);
  }, [search]);

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
            <Typography className={classes.heading}>
              Add Preferred Rooms for Groups
            </Typography>
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
                    Group
                  </InputLabel>
                  <Select
                    variant="filled"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={group}
                    style={{ width: "150px" }}
                    disabled={!groups.length}
                    onChange={(event) => setGroup(event.target.value)}
                  >
                    {groups.map((option) => (
                      <MenuItem
                        key={option._id}
                        value={
                          option.academicYrSem +
                          "." +
                          option.programme +
                          "." +
                          option.grpNo
                        }
                      >
                        {option.academicYrSem +
                          "." +
                          option.programme +
                          "." +
                          option.grpNo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  className={classes.formControl}
                  style={{ marginLeft: 5, marginTop: 20 }}
                >
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ marginLeft: 7 }}
                  >
                    Room
                  </InputLabel>
                  <Select
                    variant="filled"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={room}
                    style={{ width: "150px" }}
                    disabled={!building_room.length}
                    onChange={(event) => setRoom(event.target.value)}
                  >
                    {building_room.map((option) => (
                      <MenuItem key={option._id} value={option.Room}>
                        {option.Room}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 10, marginLeft: 50 }}
                  disabled={!room || !group}
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
                {room_group.length !== 0 ? (
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

                {room_group.length !== 0 ? (
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
                              Group
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Room
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
                            {room_group.map((item) => (
                              <TableRow hover key={item._id}>
                                <TableCell align="center">
                                  {item.group}
                                </TableCell>
                                <TableCell align="center">
                                  {item.room}
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
                                  {item.group}
                                </TableCell>
                                <TableCell align="center">
                                  {item.room}
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

export default Room_group;
