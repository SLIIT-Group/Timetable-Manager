import React from 'react';
import { Button, Table } from 'reactstrap';

function AllocationsTable({ allocationData }) {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Day</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        {allocationData.map((item) => (
          <tr key={item.day}>
            <td>{item.day}</td>
            <td>{item.hours}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AllocationsTable;
