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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px",
    marginLeft: 240,
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
  const [buildings, setBuilding] = useState([]);
  const [building_room, setBuilding_room] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState("");
  const [number, setNumber] = useState("");
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
        setBuilding_room(res.data); //save retrieved data to the hook
      });
  }, [expanded, table]);

  const onClick = (id) => {
    setNumber(id);
    console.log(building_room);
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
        console.log(res.data);
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
      const updateBuilding = {
        Building: block,
        Room: room,
        Capacity: capacity,
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
            setTable(true);
          } else {
            NotificationManager.warning(
              "Warning message",
              "Building is already there",
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
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "5px solid #3f51b5",
                  borderRadius: 50,
                  padding: 20,
                  width: 300,
                }}
              >
                {/* <TextField
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
                </TextField> */}

                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Building
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={block}
                    style={{ width: "160px" }}
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
                  style={{ marginTop: 10, marginLeft: 10 }}
                  disabled={buildings.length == 0 || !room || !capacity}
                  onClick={addRoom}
                >
                  {toggle.value}
                </Button>
              </form>
              {building_room.length !== 0 ? (
                <Grid>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
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
                          <StyledTableCell align="center">Room</StyledTableCell>
                          <StyledTableCell align="center">
                            Capacity
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Delete
                          </StyledTableCell>
                          <StyledTableCell align="center">Edit</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {building_room.map((item) => (
                          <TableRow hover key={item._id}>
                            <TableCell align="center">
                              {item.Building}
                            </TableCell>
                            <TableCell align="center">{item.Room}</TableCell>
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
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <h1></h1>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </Container>
      <NotificationContainer />
    </div>
  );
}

export default AddRoom;
