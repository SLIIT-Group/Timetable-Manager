import React from "react";
import { Button, Table } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

function AllocationsTable({
  allocationData,
  setAllocationData,
  days,
  setDays,
  setEditingItem,
  setIsEditing,
}) {
  const deleteItem = (item) => {
    setAllocationData(allocationData.filter((alloc) => alloc.day !== item.day));
    setDays([...days, item.day]);
  };

  const buttonStyle = {
    backgroundColor: "#291d99",
    border: "none",
  };
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Day</th>
          <th>Hours</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {allocationData.map((item) => (
          <tr key={item.day}>
            <td>{item.day}</td>
            <td>{item.hours}</td>
            <td>
              <EditIcon
                onClick={() => {
                  setEditingItem(item);
                  setIsEditing(true);
                }}
              ></EditIcon>
            </td>
            <td>
              <DeleteIcon
                onClick={() => {
                  deleteItem(item);
                }}
              ></DeleteIcon>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AllocationsTable;
