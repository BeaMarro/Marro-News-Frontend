import React from "react";
import { Alert } from "react-bootstrap";

function AlertMessage({ message }) {
  return (
    <Alert variant="danger" className="mt-3">
      {message}
    </Alert>
  );
}

export default AlertMessage;
