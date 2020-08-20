import React, { useState } from "react";
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
import Room_tag from "./Room_tag";
import Room_lecturer from "./Room_lecturer";
import Room_group from "./Room_group";
import Room_session from "./Room_session";
import Time_restriction from "./Time_restriction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    margin: "10px",
    marginRight: "100px",
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

export default function Rooms() {
  const classes = useStyles();
  const [buildings, setBuilding] = useState([]);
  const [input, setInput] = useState("");
  const [search, setsearch] = useState("");
  const [toggle, setToggle] = React.useState({
    value: "Add",
    isEdit: true,
  });
  const onClick = (e) => {
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

  const addBuilding = (e) => {
    e.preventDefault();
    if (toggle.value === "Save") {
      setToggle({
        value: "Add",
        isEdit: false,
      });
    } else {
      setBuilding([...buildings, input]);
      setInput("");
    }
  };

  return (
    <div className={classes.layout}>
      <Room_tag />
      <br />
      <Room_lecturer />
      <br />
      <Room_group />
      <br />
      <Room_session />
      <br />
      <Time_restriction />
    </div>
  );
}
