import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function TableForm({ handleSubmit }) {
  const [show, setShow] = useState(false);
  const [inputData, setInputData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getInputs = (e) => {
    const { name, value } = e.target;
    const data = {
      ...inputData,
      [name]: value
    };
    setInputData(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(inputData);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ margin: "10px 10px" }}
      >
        Add transaction
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Control
              type="date"
              placeholder="date"
              name="date"
              onChange={getInputs}
              style={{ margin: "2px" }}
            />
            <Form.Control
              type="text"
              placeholder="description"
              name="description"
              onChange={getInputs}
              style={{ margin: "2px" }}
            />
            <Form.Select
              aria-label="Default select example"
              name="category"
              onChange={getInputs}
              style={{ margin: "2px" }}
            >
              <option>category</option>
              <option value="Income">Income</option>
              <option value="Food">Food</option>
              <option value="Gift">Gift</option>
              {/* Add more options as needed */}
            </Form.Select>
            <Form.Control
              type="number"
              placeholder="amount"
              name="amount"
              onChange={getInputs}
              style={{ margin: "2px" }}
            />
            <Button
              variant="primary"
              type="submit"
              style={{ margin: "2px" }}
            >
              Add transaction
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TableForm;
