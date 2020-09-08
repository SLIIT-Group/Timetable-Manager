import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddBuilding from "./AddBuilding";
import AddRoom from "./AddRoom";

export default function LocationManager() {
  //const classes = useStyles();

  return (
    <div>
      <AddBuilding />
      <AddRoom />
    </div>
  );
}
