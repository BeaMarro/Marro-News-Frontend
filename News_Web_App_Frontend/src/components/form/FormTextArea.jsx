import React from "react";
import { Form } from "react-bootstrap";

function FormTextArea({ label, name, rows, value, onChangeHandler }) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={rows}
        name={name}
        value={value}
        onChange={onChangeHandler}
      />
    </Form.Group>
  );
}

export default FormTextArea;
