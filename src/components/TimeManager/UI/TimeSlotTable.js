import React from 'react';
import { Button, Table } from 'reactstrap';

function AllocationsTable({ addedSlot, setAddedSlot }) {
  const deleteItem = (slot) => {
    setAddedSlot(
      addedSlot.filter(
        (addedSlot) =>
          addedSlot.startTime !== slot.startTime &&
          addedSlot.endTime !== slot.endTime
      )
    );
  };

  const buttonStyle = {
    backgroundColor: '#291d99',
    border: 'none',
  };
  return (
    <Table style={{ marginTop: '20px' }} hover>
      <thead>
        <tr>
          <th>Start Time</th>
          <th>End Time</th>

          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {addedSlot.map((slot) => (
          <tr>
            <td>{slot.startTime}</td>
            <td>{slot.endTime}</td>
            <td>
              <Button style={buttonStyle} onClick={() => deleteItem(slot)}>
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
