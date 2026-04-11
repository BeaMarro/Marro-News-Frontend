import React, { useState } from "react";
import { Form, Image, Button, Container } from "react-bootstrap";
import "../../styles/IconLabel.css";
import "../../styles/FormFileUpload.css";

function FormFileUploadInput({ label, onChangeHandler, currentFile }) {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <Form.Group controlId="formFile" className="mb-3">
      {currentFile === null ? (
        <>
          <Form.Label className="file-button">{label}</Form.Label>
          <Form.Control type="file" onChange={onChangeHandler} />
        </>
      ) : (
        <div className={`icon-container ${fullscreen ? 'fullscreen' : ''}`}>
          <Form.Label>Current Image</Form.Label>

          {fullscreen && (
            <>
              <Image className={`icon fullscreen`} src={`data:image/png;base64,${currentFile}`} />
              <br />
            </>
          )}

          <Button variant="primary" onClick={toggleFullscreen}>
            {fullscreen ? 'Close Image' : 'View Image'}
          </Button>
          <br/>

          {!fullscreen && (
              <>
                <Form.Label>Update Image</Form.Label>
                <Container className="d-flex">
                  <Form.Label className="file-button">Upload Image</Form.Label>
                  <Form.Control type="file" onChange={onChangeHandler} />
                </Container>
              </>
          )}
        </div>
      )}
    </Form.Group>
  );
}

export default FormFileUploadInput;
