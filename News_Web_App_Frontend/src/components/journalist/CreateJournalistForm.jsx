import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Alert } from 'react-bootstrap';
import MainSubmitButton from '../form/MainSubmitButton';
import "../../styles/CreateArticleForm.css";
import "../../styles/MainButton.css";
import FormTextControl from '../form/FormTextControl';
import JournalistAPI from '../../api/JournalistAPI';
import FormDropdown from '../form/FormDropdown';
import AccountValidation from '../../validation/AccountValidation';
import JournalistValidation from '../../validation/JournalistValidation';

function CreateJournalistForm() {
  const [show, setShow] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useNavigation = useNavigate();

  const departments = [
    { value: "EDITORIAL", label: "Editorial" },
    { value: "NEWSROOM", label: "Newsroom" },
    { value: "COPYRIGHTING", label: "Copyrighting" },
    { value: "LAYOUT_DESIGN", label: "Layout & Design" },
    { value: "ADVERTISING_MARKETING", label: "Advertising & Marketing" },
    { value: "ONLINE", label: "Online" }
  ];

  const [newJournalist, setNewJournalist] = useState({
      fullName: "",
      username: "",
      dateOfBirth: "",
      email: "",
      profilePicture: null,
      password: "12345678910",
      department: ''
  });
  
  const handleChange = (e) => { // Change event handler -> When an item from the form is changed the value is set to the journalist
      const { name, value } = e.target;
      setNewJournalist({
          ...newJournalist,
          [name]: value
      });
  };

  const validateJournalist = () => {
    if (!AccountValidation.isFullNameValid(newJournalist.fullName)) {
      setValidationError('Full name is required.');
      return false;
    }
  
    if (!AccountValidation.isFullNameLengthValid(newJournalist.fullName)) {
      setValidationError('Full name length should be between 2 and 50 characters.');
      return false;
    }
  
    if (!AccountValidation.isUsernameValid(newJournalist.username)) {
      setValidationError('Username is required.');
      return false;
    }
  
    if (!AccountValidation.isUsernameLengthValid(newJournalist.username)) {
      setValidationError('Username length should be between 2 and 50 characters.');
      return false;
    }

    if (!AccountValidation.isEmailValid(newJournalist.email)) {
      setValidationError('Email is required.');
      return false;
    }


    if(!AccountValidation.isDateOfBirthValid(newJournalist.dateOfBirth)) {
      setValidationError('Date of birth is required.');
      return false;
    }

    if(!JournalistValidation.isDepartmentValid(newJournalist.department)) {
      setValidationError('Department is required.');
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => { // Submit event handle -> When the form is submitted
      e.preventDefault(); // This prevents default actions from happening: Prevents submit from occurring at unwanted time
      setFormSubmitted(true);

      try {
        const isJournalistValid = validateJournalist();
        if (isJournalistValid) {
          await JournalistAPI.postJournalist(newJournalist);
          useNavigation("/journalists");
          window.location.reload();
        } else {
          console.log('Article validation failed');
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Handle creating existing content
          setValidationError("A journalist with this username already exists");
          return false;
        } else {
          console.error('Error posting journalist:', error);
          setValidationError("Error posting journalist: Something went wrong");
          return false;
        }
      }
    };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="submit">
        Add New Journalist
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal-width-small">
        <Modal.Header>
          <Modal.Title>Add New Journalist</Modal.Title>
          <Button variant="danger" onClick={handleClose}>✖</Button>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit} className="form">
              {formSubmitted && (
                    <>
                      {validationError && (
                        <Alert variant="danger" className="mt-3">
                          {validationError}
                        </Alert>
                      )}
                    </>
                  )}

                <Row className="mb-3">
                    <Col>
                        <FormTextControl
                          label="Full Name*" 
                          type="text" 
                          name="fullName" 
                          value={newJournalist.fullName} 
                          onChangeHandler={handleChange}
                        />
                    </Col>
                    <Col>
                        <FormTextControl
                          label="Username*"
                          type="text"
                          name="username" 
                          value={newJournalist.username} 
                          onChangeHandler={handleChange}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FormTextControl
                          label="Email*" 
                          type="email" 
                          name="email" 
                          value={newJournalist.email}
                          onChangeHandler={handleChange}
                        />
                    </Col>
                    <Col>
                        <FormTextControl
                          label="Date Of Birth*" 
                          type="date" 
                          name="dateOfBirth" 
                          value={newJournalist.dateOfBirth}
                          onChangeHandler={handleChange}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FormDropdown
                          title="Department*"
                          name="department"
                          options={departments}
                          value={newJournalist.department}
                          onChangeHandler={handleChange}
                        /> 
                    </Col>
                </Row>

              <MainSubmitButton
                title="Submit"
                link="/manage-journalists"
              />
            </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateJournalistForm;