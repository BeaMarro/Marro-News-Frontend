import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Alert, Button } from 'react-bootstrap';
import MainSubmitButton from '../form/MainSubmitButton';
import PasswordIcon from "../../assets/images/Password.png";
import FormTextControl from '../form/FormTextControl';
import TokenManager from '../../api/TokenManager';
import AdminAPI from '../../api/AdminAPI';
import JournalistAPI from '../../api/JournalistAPI';
import UserAPI from '../../api/UserAPI';
import TextIconButton from '../form/TextIconButton';
import RegisterValidation from '../../validation/RegisterValidation';

const UpdatePassword = ({ account }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const useNavigation = useNavigate();

  const [validationError, setValidationError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'new-password':
        setNewPassword(value);
        break;
      case 'confirm-new-password':
        setConfirmNewPassword(value);
        break;
      default:
        break;
    }
  };

  const validatePasswords = () => {
    if (!RegisterValidation.isPasswordValid(newPassword)) {
      setValidationError('Password is required.');
      return false;
    }

    if (!RegisterValidation.isConfirmPasswordValid(confirmNewPassword)) {
      setValidationError('Confirm password is required.');
      return false;
    }

    if (!RegisterValidation.isPasswordLengthValid(newPassword, confirmNewPassword)) {
      setValidationError('Password length must be between 8 and 200 characters.');
      return false;
    }

    if (!RegisterValidation.arePasswordsMatching(newPassword, confirmNewPassword)) {
      setValidationError('Passwords should be matching.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    const arePasswordsValid = validatePasswords();

    // Validate passwords and update account accordingly
    if (arePasswordsValid) {
      try {
        if (role === "USER") {
          await UserAPI.putUser({
            ...account,
            password: newPassword,
          });
        } else if (role === "ADMIN") {
          await AdminAPI.putAdmin({
            ...account,
            password: newPassword,
          });
        } else if (role === "JOURNALIST") {
          await JournalistAPI.putJournalist({
            ...account,
            password: newPassword,
          });
        }

        handleClose();
        useNavigation('/login');
      } catch (error) {
        console.error('Error updating password:', error);
        alert('Error updating password: Something went wrong');
      }
    }
  };

  return (
    <>
      <TextIconButton icon={PasswordIcon} text="Update Password" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Password</Modal.Title>
          <Button variant="danger" onClick={handleClose}>✖</Button>
        </Modal.Header>
        <Modal.Body>
          {formSubmitted && (
            <>
              {validationError && (
                <Alert variant="danger" className="mt-3">
                  {validationError}
                </Alert>
              )}
            </>
          )}
          <Form onSubmit={handleSubmit} className="form">
            <Row>
              <Col>
                <FormTextControl
                  label="New Password*"
                  type="password"
                  name="new-password"
                  value={newPassword}
                  onChangeHandler={handleChange}
                />
                <FormTextControl
                  label="Confirm New Password*"
                  type="password"
                  name="confirm-new-password"
                  value={confirmNewPassword}
                  onChangeHandler={handleChange}
                />
              </Col>
            </Row>

            <MainSubmitButton title="Update" link="/" />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdatePassword;
