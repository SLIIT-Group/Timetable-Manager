import React, { Component } from "react";
//To keep backend and front end connectivity, we import axios
import axios from "axios";
import LecturerTableRow from "./LecturerTableRow";
import { Link } from "react-router-dom";

export default class FullTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lecturers: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/lecturers")
      .then((response) => {
        this.setState({ lecturers: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.lecturers.map(function (object, i) {
      return <LecturerTableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Link to={"/lecturers"} className="btn btn-primary">
          {" "}
          Add Lecturer{" "}
        </Link>
        <h3 align="center"> Lecturer List </h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee ID</th>
              <th>Faculty</th>
              <th>Department</th>
              <th>Center</th>
              <th>Building</th>
              <th>Level</th>
              <th>Rank</th>
              <th colSpan="2">Edit/Delete</th>
            </tr>
          </thead>

          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
