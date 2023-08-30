import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function TableItem({ data, deleteData }) {
  const [id] = useState(data.id);

  const handleDelete = () => {
    deleteData(id);
  };

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.date}</td>
      <td>{data.description}</td>
      <td>{data.category}</td>
      <td>{data.amount}</td>
      <td>
        <Button onClick={handleDelete} variant='danger'>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default TableItem;
