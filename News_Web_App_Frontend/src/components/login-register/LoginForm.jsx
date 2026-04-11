import React, { useState } from 'react';
import '../../styles/LoginForm.css';
import '../../styles/MainButton.css';
import MainSubmitButton from '../form/MainSubmitButton';
import AuthAPI from '../../api/AuthAPI';
import TokenManager from '../../api/TokenManager';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Alert, Button } from 'react-bootstrap';
import FormTextControl from '../form/FormTextControl';
import { useNavigate } from 'react-router-dom';
import AccountValidation from '../../validation/AccountValidation';
import RegisterValidation from '../../validation/RegisterValidation';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateCredentials = () => {
    if (!AccountValidation.isUsernameValid(username)) {
      setValidationError('Username is required.');
      return false;
    }

    if (!RegisterValidation.isPasswordValid(password)) {
      setValidationError('Password is required.');
      return false;
    }
    
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      setFormSubmitted(true);
  
      const areCredentialsValid = validateCredentials();
      
      if (areCredentialsValid) {
        await AuthAPI.login(username, password);
        const accessToken = TokenManager.getAccessToken();
  
        if (accessToken) {
          // Redirect to the Account page
          navigate("/account");
          
          // Reload the page after redirection
          window.location.reload();
        } else {
          setLoginFailed(true);
        }
      }
  
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      setLoginFailed(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container fluid className="p-4 background-radial-gradient vh-100">
        <Row>
          <Col md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Login<br />
            </h1>
            <p className="px-3" style={{ color: 'hsl(218, 81%, 85%)' }}>
              Access the best of Marro News
            </p>
          </Col>
          <Col md="6" className="position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <Card className="my-5 bg-glass">
              <Card.Body className="p-5">
                <FormTextControl label="Username" type="text" name="username" value={username} onChangeHandler={handleUsernameChange} />
                <FormTextControl label="Password" type="password" name="password" value={password} onChangeHandler={handlePasswordChange} />
                <MainSubmitButton title="Login" />
                {loginFailed && (
                  <Alert variant="danger" className="mt-3">
                    Login failed. Please ensure that your username and password are correct.
                  </Alert>
                )}
                {formSubmitted && (
                    <>
                      {validationError && (
                        <Alert variant="danger" className="mt-3">
                          {validationError}
                        </Alert>
                      )}
                    </>
                )}
                
                <br/>
                <p>New to Marro News?</p>
                <Link to="/register">
                  <Button id="center" variant='secondary' className="submit">Register</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default LoginForm;
