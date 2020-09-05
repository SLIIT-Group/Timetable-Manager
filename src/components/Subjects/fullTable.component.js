import React, { Component } from "react";
//To keep backend and front end connectivity, we import axios
import axios from "axios";
import ProductTableRow from "./tableRow.component";
import { Link } from "react-router-dom";

export default class FullTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    //type of request is 'get'
    axios.get("http://localhost:5000/api/subjects")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.products.map(function (object, i) {
      return <ProductTableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Link to={"/subject"} className="btn btn-primary">
          {" "}
          Add Subject{" "}
        </Link>
        <h3 align="center"> Products List </h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Offered Year</th>
              <th>Offered Semester</th>
              <th>Lec. Hours</th>
              <th>Tute. Hours</th>
              <th>Lab Hours</th>
              <th>Eval. Hours</th>
              <th colSpan="2">Edit/Delete</th>
            </tr>
          </thead>

          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
