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

function Room_subject_tag(props) {
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
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [room_subject_tag, SetRoomSubjectTag] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/tags/all`)
      .then((res) => res.json())
      .then(
        (result) => {
          setTags(result);
        },
        (error) => {
          setError(error);
        }
      );
    axios.get(`http://localhost:5000/api/room/`).then((res) => {
      setBuilding_room(res.data);
    });

    axios.get(`http://localhost:5000/api/subjects/`).then((res) => {
      setSubjects(res.data);
    });

    axios.get(`http://localhost:5000/api/room_subject_tag/`).then((res) => {
      SetRoomSubjectTag(res.data);
      setSearchFilter(res.data);
    });
  }, [expanded, table]);

  const onClick = (id) => {
    setNumber(id);

    room_subject_tag.map((item) => {
      if (item._id == id) {
        return setBlock(item.tag), setRoom(item.room), setSubject(item.subject);
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
      .delete(`http://localhost:5000/api/room_subject_tag/remove/${id}`)
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

      const data = {
        tag: block,
        room: room,
        subject: subject,
      };
      if (!checkArray) {
        axios
          .post(
            `http://localhost:5000/api/room_subject_tag/update/${number}`,
            data
          )
          .then((res) => {
            NotificationManager.info("Item is Successfully updated", "", 3000);
            setTable(true);
            setBlock("");
            setRoom("");
            setSubject("");
          });
      } else {
        NotificationManager.warning("Item is Already There", "", 3000);
        setBlock("");
        setRoom("");
        setSubject("");
      }
    } else {
      const data = {
        subject: subject,
        tag: block,
        room: room,
      };

      if (checkArray) {
        NotificationManager.warning(
          "Warning message",
          "Room is already allocated",
          3000
        );
        setSubject("");
        setRoom("");
        setBlock("");
      } else {
        axios
          .post("http://localhost:5000/api/room_subject_tag/add", data)
          .then((res) => {
            if (res.data.success == true) {
              NotificationManager.success("Success message", "Room Added");
              setSubject("");
              setRoom("");
              setBlock("");
              setTable(true);
            } else {
              NotificationManager.warning(
                "Warning message",
                "Room is already there",
                3000
              );
              setSubject("");
              setRoom("");
              setBlock("");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    room_subject_tag.map((item) => {
      if (item.tag == block && item.room == room && item.subject == subject) {
        return setCheckArray(true);
      } else {
        return setCheckArray(false);
      }
    });
  }, [block, room]);

  useEffect(() => {
    const results = room_subject_tag.filter((data) =>
      data.subject.toLowerCase().includes(search)
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
              Add Preferred Room for a Subject
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
                    Subject
                  </InputLabel>
                  <Select
                    variant="filled"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subject}
                    style={{ width: "150px" }}
                    disabled={!subjects.length}
                    onChange={(event) => setSubject(event.target.value)}
                  >
                    {subjects.map((option) => (
                      <MenuItem key={option._id} value={option.subName}>
                        {option.subName}
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
                    Tag
                  </InputLabel>
                  <Select
                    variant="filled"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={block}
                    style={{ width: "150px" }}
                    disabled={!tags.length}
                    onChange={(event) => setBlock(event.target.value)}
                  >
                    {tags.map((option) => (
                      <MenuItem key={option._id} value={option.tag}>
                        {option.tag}
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
                  disabled={!block || !tagRoom}
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
                {room_subject_tag.length !== 0 ? (
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

                {room_subject_tag.length !== 0 ? (
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
                              Subject
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Tag
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
                            {room_subject_tag.map((item) => (
                              <TableRow hover key={item._id}>
                                <TableCell align="center">
                                  {item.subject}
                                </TableCell>
                                <TableCell align="center">{item.tag}</TableCell>
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
                                  {item.subject}
                                </TableCell>
                                <TableCell align="center">{item.tag}</TableCell>
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

export default Room_subject_tag;
