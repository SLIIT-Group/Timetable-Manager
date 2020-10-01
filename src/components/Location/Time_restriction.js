import "react-dropdown/style.css";
import "react-notifications/lib/notifications.css";

import DateFnsUtils from "@date-io/date-fns";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
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

function Time_restriction(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [table, setTable] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [tags, setTags] = useState([]);
  const [building_room, setBuilding_room] = useState([]);
  const [room, setRoom] = useState("");
  const [number, setNumber] = useState("");
  const [checkArray, setCheckArray] = useState(false);
  const [toggle, setToggle] = React.useState({
    value: "Add",
    isEdit: true,
  });
  const [tagRoom, setTagRoom] = useState([]);
  const [block, setBlock] = useState("");
  const [room_group, setRoomGroup] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [timeRestriction, setTimeRestriction] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setRoom("");
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/room/`).then((res) => {
      setBuilding_room(res.data);
    });

    axios

      .get(`http://localhost:5000/api/time_restriction_room/`)
      .then((res) => {
        setTimeRestriction(res.data);
        setSearchFilter(res.data);
      });
  }, [expanded, table]);

  const onClick = (id) => {
    setNumber(id);

    room_group.map((item) => {
      if (item._id == id) {
        return setSession(item.group), setRoom(item.room);
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
      .delete(`http://localhost:5000/api/time_restriction_room/remove/${id}`)
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
        group: session,
        room: room,
      };
      if (!checkArray) {
        axios
          .post(
            `http://localhost:5000/api/time_restriction_room/update/${number}`,
            update_tagRoom
          )
          .then((res) => {
            NotificationManager.info("Item is Successfully updated", "", 3000);
            setTable(true);
            setSession("");
            setRoom("");
          });
      } else {
        NotificationManager.warning("Item is Already There", "", 3000);
        setSession("");
        setRoom("");
      }
    } else {
      try {
        const data = {
          room: room,
          start_time: startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          end_time: endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        if (checkArray) {
          NotificationManager.warning(
            "Warning message",
            "Room is already allocated",
            3000
          );
          setSession("");
          setRoom("");
        } else {
          axios
            .post("http://localhost:5000/api/time_restriction_room/add", data)
            .then((res) => {
              if (res.data.success == true) {
                NotificationManager.success("Success message", "Room Added");
                setStartTime();
                setRoom("");
                setTable(true);
              } else {
                NotificationManager.warning(
                  "Warning message",
                  "Room is already there",
                  3000
                );
                setSession("");
                setRoom("");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    timeRestriction.map((item) => {
      try {
        if (
          item.room == room &&
          item.start_time ==
            startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) &&
          item.end_time ==
            endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
        ) {
          return setCheckArray(true);
        } else {
          return setCheckArray(false);
        }
      } catch (error) {}
    });
  }, [startTime, endTime]);

  useEffect(() => {
    const results = timeRestriction.filter((data) =>
      data.room.toLowerCase().includes(search)
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
              Allocate Time Restriction for a Room
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
                <br />
                <br />
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      clearable
                      ampm={false}
                      label="Start time"
                      hidden={!room}
                      value={startTime}
                      onChange={setStartTime}
                      autoOk
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      ampm={false}
                      clearable
                      hidden={!startTime}
                      label="End time"
                      value={endTime}
                      onChange={setEndTime}
                      autoOk
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 10, marginLeft: 50 }}
                  disabled={!room || !startTime || !endTime}
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
                {timeRestriction.length !== 0 ? (
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

                {timeRestriction.length !== 0 ? (
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
                              Room
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Start Time
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              End Time
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Delete
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        {!search ? (
                          <TableBody>
                            {timeRestriction.map((item) => (
                              <TableRow hover key={item._id}>
                                <TableCell align="center">
                                  {item.room}
                                </TableCell>
                                <TableCell align="center">
                                  {item.start_time}
                                </TableCell>
                                <TableCell align="center">
                                  {item.end_time}
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
                              </TableRow>
                            ))}
                          </TableBody>
                        ) : (
                          <TableBody>
                            {searchFilter.map((item) => (
                              <TableRow hover key={item._id}>
                                <TableCell align="center">
                                  {item.room}
                                </TableCell>
                                <TableCell align="center">
                                  {item.start_time}
                                </TableCell>
                                <TableCell align="center">
                                  {item.end_time}
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

export default Time_restriction;
