import React from 'react';
import { Button, Table } from 'reactstrap';

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
    backgroundColor: '#291d99',
    border: 'none',
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
              <Button
                style={buttonStyle}
                onClick={() => {
                  setEditingItem(item);
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                style={buttonStyle}
                onClick={() => {
                  deleteItem(item);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AllocationsTable;
