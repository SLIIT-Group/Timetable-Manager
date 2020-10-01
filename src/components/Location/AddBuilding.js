import 'react-notifications/lib/notifications.css';

import { Button, Container, Grid } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

function AddBuilding(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [buildings, setBuilding] = useState([]);
  const [input, setInput] = useState("");
  const [toggle, setToggle] = React.useState({
    value: "Add",
    isEdit: true,
  });
  const [number, setNumber] = useState("");
  const [upRoom, setUpRoom] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
      const updateRoom = {
        Building: input,
      };
      axios

        .post(
          `https://kaalaapi.herokuapp.com/api/building/update/${number}`,
          updateBuilding
        )
        .then((res) => {
          NotificationManager.info("Item is Successfully updated", "", 3000);
        });

      axios

        .put(`https://kaalaapi.herokuapp.com/api/room/updateOne/${number}`, updateRoom)
        .then((res) => {
          console.log("updated");
        });
      setInput("");
    } else {
      setInput("");
      const building_names = {
        building: input,
      };

      axios
        .post("https://kaalaapi.herokuapp.com/api/building/add", building_names)
        .then((res) => {
          if (res.data.success == true) {
            NotificationManager.success("Success message", "Building Added");
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
  useEffect(() => {
    fetch(`https://kaalaapi.herokuapp.com/api/building/`)
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
  const deleteBuilding = (buildingName) => {
    setInput("");
    axios
      .delete(`https://kaalaapi.herokuapp.com/api/building/delete/${buildingName}`)
      .then((res) => {
        NotificationManager.info("Item is Successfully deleted", "", 3000);
      })
      .catch((err) => console.log("Done"));
    axios
      .delete(`https://kaalaapi.herokuapp.com/api/room/delete/${buildingName}`)
      .then((res) => {})
      .catch((err) => console.log("Done"));
  };

  const onClick = (id) => {
    setNumber(id);
    buildings.map((item) => {
      if (item._id == id) {
        return setInput(item.building), setUpRoom(item.building);
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
            <Typography className={classes.heading}>Add Building</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
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
                  padding: 20,
                  width: 250,
                  flex: 5,
                }}
              >
                <TextField
                  id="standard-secondary"
                  label="Add a Building"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 10, marginLeft: 60 }}
                  disabled={!input}
                  onClick={addBuilding}
                >
                  {toggle.value}
                </Button>
              </form>
              {buildings.length !== 0 ? (
                <Grid style={{ flex: 5, minWidth: 500, paddingLeft: 50 }}>
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
                            Delete
                          </StyledTableCell>
                          <StyledTableCell align="center">Edit</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {buildings.map((item) => (
                          <TableRow hover key={item._id}>
                            <TableCell align="center">
                              {item.building}
                            </TableCell>
                            <TableCell align="center">
                              <DeleteIcon
                                onClick={() => {
                                  deleteBuilding(item.building);
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
                <h1 style={{ fontWeight: "bolder", paddingLeft: 60 }}>
                  No data
                </h1>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </Container>
      <NotificationContainer />
    </div>
  );
}

export default AddBuilding;
