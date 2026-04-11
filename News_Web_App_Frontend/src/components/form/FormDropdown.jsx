import React from "react";
import { Form } from "react-bootstrap";

function FormDropdown({ title, value, onChangeHandler, options, name }) {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <br />
      <Form.Select
        name={name}
        value={value}
        onChange={onChangeHandler}
        size="lg"
        title="Drop large"
        className="select"
      >
        <option value="">Select Option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default FormDropdown;
