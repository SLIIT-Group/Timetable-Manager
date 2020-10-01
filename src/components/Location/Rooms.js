import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Consecutive_sessions from "./consecutive_sessions";
import Room_group from "./Room_group";
import Room_lecturer from "./Room_lecturer";
import Room_session from "./Room_session";
import Room_subgroup from "./Room_subgroup";
import Room_subject_tag from "./Room_Subject_Tag";
import Room_tag from "./Room_tag";
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
    <div>
      <Room_tag />
      <Room_subject_tag />
      <Room_lecturer />
      <Room_group />
      <Room_subgroup />
      <Room_session />
      <Consecutive_sessions />
      <Time_restriction />
    </div>
  );
}
