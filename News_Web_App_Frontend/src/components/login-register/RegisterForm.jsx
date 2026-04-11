import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, FormLabel } from 'react-bootstrap';
import FormTextControl from '../form/FormTextControl';
import UserAPI from '../../api/UserAPI';
import AccountValidation from '../../validation/AccountValidation';
import RegisterValidation from '../../validation/RegisterValidation';
import MainSubmitButton from '../form/MainSubmitButton';
import FormFileUploadInput from '../form/FormFileUploadInput';

function RegisterForm() {
  const [validationError, setValidationError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicture: "",
    bio: "Hello! I am using Marro News"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];

        setAccount((prevAccount) => ({
          ...prevAccount,
          profilePicture: base64Data,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const validateAccount = () => {
    if (!AccountValidation.isFullNameValid(account.fullName)) {
      setValidationError('Full name is required.');
      return false;
    }
  
    if (!AccountValidation.isFullNameLengthValid(account.fullName)) {
      setValidationError('Full name length should be between 2 and 50 characters.');
      return false;
    }
  
    if (!AccountValidation.isUsernameValid(account.username)) {
      setValidationError('Username is required.');
      return false;
    }
  
    if (!AccountValidation.isUsernameLengthValid(account.username)) {
      setValidationError('Username length should be between 2 and 50 characters.');
      return false;
    }

    if (!AccountValidation.isEmailValid(account.email)) {
      setValidationError('Email is required.');
      return false;
    }

    if(!AccountValidation.isDateOfBirthValid(account.dateOfBirth)) {
      setValidationError('Date of birth is required.');
      return false;
    }

    if(!RegisterValidation.isPasswordValid(account.password)) {
      setValidationError('Password is required.');
      return false;
    }

    if(!RegisterValidation.isConfirmPasswordValid(account.confirmPassword)) {
      setValidationError('Confirm password is required.');
      return false;
    }

    if(!RegisterValidation.isPasswordLengthValid(account.password, account.confirmPassword)) {
      setValidationError('Password length must be between 8 and 200 characters.');
      return false;
    }

    if(!RegisterValidation.arePasswordsMatching(account.password, account.confirmPassword)) {
      setValidationError('Passwords should be matching.');
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Update if form is submitted
  
    const isAccountValid = validateAccount();
  
    if (isAccountValid) {
      try {
        await UserAPI.postUser(account);
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setValidationError("A user with this username already exists");
        } else {
          console.error('Error posting user:', error);
          setValidationError("Error posting user: Something went wrong");
        }
      }
    } else {
      console.log("Account validation failed.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container fluid className="p-4 background-radial-gradient vh-100">
        <Row>
          <Col md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Register<br />
            </h1>
            <p className="px-3" style={{ color: 'hsl(218, 81%, 85%)' }}>
              Create a user account and join the Marro News community!
            </p>
          </Col>
          <Col md="6" className="position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <Card className="my-5 bg-glass">
              <Card.Body className="p-5">
                
                <FormTextControl
                  label="Full Name*" 
                  type="text" 
                  name="fullName" 
                  value={account.fullName} 
                  onChangeHandler={handleChange} 
                />

                <Row>
                  <Col md="6">
                    <FormTextControl
                     label="Username*" 
                     type="text" 
                     name="username" 
                     value={account.username} 
                     onChangeHandler={handleChange} 
                    />
                  </Col>
                  <Col md="6">
                    <FormTextControl
                     label="Email*" 
                     type="email" 
                     name="email" 
                     value={account.email} 
                     onChangeHandler={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <FormTextControl
                      label="Password*" 
                      type="password" 
                      name="password" 
                      value={account.password} 
                      onChangeHandler={handleChange} 
                    />
                  </Col>
                  <Col md="6">
                    <FormTextControl
                      label="Confirm Password*"
                      type="password"
                      name="confirmPassword"
                      value={account.confirmPassword}
                      onChangeHandler={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <FormTextControl
                      label="Date of Birth*" 
                      type="date" 
                      name="dateOfBirth" 
                      value={account.dateOfBirth} 
                      onChangeHandler={handleChange} 
                    />
                  </Col>
                  <Col md="6">
                    <FormFileUploadInput
                      label="Upload Profile Picture"
                      onChangeHandler={handleImageChange}
                      currentFile={null}
                    />
                  </Col>
                </Row>

                <MainSubmitButton title="Register" />
                {formSubmitted && (
                      <>
                        {validationError && (
                          <Alert variant="danger" className="mt-3">
                            {validationError}
                          </Alert>
                        )}
                      </>
                    )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default RegisterForm;
