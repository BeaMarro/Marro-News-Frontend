import React from "react";
import { Form } from "react-bootstrap";

function FormTextControl({label, type, name, value, onChangeHandler, isRequired}) {
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{label}</Form.Label>
            <Form.Control
            type={type}
            name={name}
            value={value}
            onChange={onChangeHandler}
            required={isRequired ? true : false}
        />
        </Form.Group>
    );
}

export default FormTextControl;
