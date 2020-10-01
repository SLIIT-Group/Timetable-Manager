import 'react-dropdown/style.css';
import 'react-notifications/lib/notifications.css';

import { Button, Container, Grid } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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

function Consecutive_sessions(props) {
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
  const [block, setBlock] = useState("");
  const [consecutiveSessionRoom, setConsecutiveSessionRoomGroup] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState("");
  const [open, setOpen] = React.useState(false);
  const [sessionFilter, setSessionFilter] = useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/cs/all`)
      .then((res) => res.json())
      .then(
        (result) => {
          setSessions(result);
        },
        (error) => {
          setError(error);
        }
      );
    axios.get(`http://localhost:5000/api/room/`).then((res) => {
      setBuilding_room(res.data);
    });

    axios

      .get(`http://localhost:5000/api/consecutive_session_room/`)
      .then((res) => {
        setConsecutiveSessionRoomGroup(res.data);
        setSearchFilter(res.data);
      });
  }, [expanded, table]);

  const deleteRoom = (id) => {
    setTable(false);
    axios
      .delete(`http://localhost:5000/api/consecutive_session_room/delete/${id}`)
      .then((res) => {
        NotificationManager.info("Item is Successfully deleted", "", 3000);
        setTable(true);
      })
      .catch((err) => console.log("Error"));
  };

  const addRoom = (e) => {
    setTable(false);
    e.preventDefault();

    var arr = sessions.filter((items) => items._id == session);

    const data = {
      cs1: arr[0].cs1,
      cs2: arr[0].cs2,
      cs3: arr[0].cs3,
      room: room,
      id: arr[0]._id,
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
        .post("http://localhost:5000/api/consecutive_session_room/add", data)
        .then((res) => {
          if (res.data.success == true) {
            NotificationManager.success("Success message", "Room Added");
            setSession("");
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
  };

  useEffect(() => {
    consecutiveSessionRoom.map((item) => {
      if (item.id == session) {
        return setCheckArray(true);
      } else {
        return setCheckArray(false);
      }
    });
  }, [block, room]);

  useEffect(() => {
    const results = consecutiveSessionRoom.filter((data) =>
      data.cs1.subject.toLowerCase().includes(search)
    );
    setSearchFilter(results);
  }, [search]);

  const handleClickOpen = () => {
    setSessionFilter(sessions.filter((items) => items._id == session));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Typography className={classes.heading}>
              Add Preferred Room for Consecutive Sessions
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
                    Sessions
                  </InputLabel>
                  <Select
                    variant="filled"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={session}
                    style={{ width: "150px" }}
                    disabled={!sessions.length}
                    onChange={(event) => setSession(event.target.value)}
                  >
                    {sessions.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.cs1.groupId +
                          "/" +
                          option.cs1.subjectCode +
                          "/" +
                          option.cs1.tag +
                          "/" +
                          option.cs2.tag}
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
                  disabled={!room || !session}
                  onClick={addRoom}
                >
                  {toggle.value}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 10, marginLeft: 15 }}
                  disabled={!session}
                  onClick={handleClickOpen}
                >
                  View Details
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle>{"Session Details"}</DialogTitle>
                  <DialogContent>
                    {sessionFilter.map((item) => (
                      <DialogContentText key={item._id}>
                        Consecutive Session 1 <br />
                        {item.cs1.subject} {item.cs1.subjectCode}
                        <br />
                        {item.cs1.tag}
                        <br />
                        {item.cs1.groupId} <br />
                        <br />
                        Consecutive Session 2 <br />
                        {item.cs2.subject} {item.cs2.subjectCode}
                        <br />
                        {item.cs2.tag}
                        <br />
                        {item.cs2.groupId} <br />
                        <br />
                        Consecutive Session 3 <br />
                        {item.cs3.subject} {item.cs3.subjectCode}
                        <br />
                        {item.cs3.tag}
                        <br />
                        {item.cs3.groupId} <br />
                        <br />
                      </DialogContentText>
                    ))}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>

              <div
                style={{
                  flex: 5,
                  minWidth: 300,
                  paddingLeft: 50,
                }}
              >
                {consecutiveSessionRoom.length !== 0 ? (
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

                {consecutiveSessionRoom.length !== 0 ? (
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
                              Consecutive Session 1
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Consecutive Session 2
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Consecutive Session 3
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Room
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Delete
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        {!search ? (
                          <TableBody>
                            {consecutiveSessionRoom.map((item) => (
                              <TableRow hover key={item._id}>
                                <TableCell align="center">
                                  {item.cs1.subject} {item.cs1.subjectCode}
                                  <br />
                                  {item.cs1.tag}
                                  <br />
                                  {item.cs1.groupId}
                                </TableCell>
                                <TableCell align="center">
                                  {item.cs2.subject} {item.cs2.subjectCode}
                                  <br />
                                  {item.cs2.tag}
                                  <br />
                                  {item.cs1.groupId}
                                </TableCell>
                                <TableCell align="center">
                                  {item.cs3.subject} {item.cs3.subjectCode}
                                  <br />
                                  {item.cs3.tag}
                                  <br />
                                  {item.cs3.groupId}
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
                              </TableRow>
                            ))}
                          </TableBody>
                        ) : (
                          <TableBody>
                            {searchFilter.map((item) => (
                              <TableRow hover key={item._id}>
                                <TableCell align="center">
                                  {item.cs1.subject} {item.cs1.subjectCode}
                                  <br />
                                  {item.cs1.tag}
                                  <br />
                                  {item.cs1.groupId}
                                </TableCell>
                                <TableCell align="center">
                                  {item.cs2.subject} {item.cs2.subjectCode}
                                  <br />
                                  {item.cs2.tag}
                                  <br />
                                  {item.cs1.groupId}
                                </TableCell>
                                <TableCell align="center">
                                  {item.cs3.subject} {item.cs3.subjectCode}
                                  <br />
                                  {item.cs3.tag}
                                  <br />
                                  {item.cs3.groupId}
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

export default Consecutive_sessions;
