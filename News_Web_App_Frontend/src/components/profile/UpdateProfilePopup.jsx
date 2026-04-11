import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Alert, Button } from 'react-bootstrap';
import MainSubmitButton from '../form/MainSubmitButton';
import "../../styles/CreateArticleForm.css";
import "../../styles/MainButton.css";
import UpdateButton from '../form/UpdateButton';
import FormTextControl from '../form/FormTextControl';
import FormTextArea from '../form/FormTextArea';
import FormFileUploadInput from '../form/FormFileUploadInput';
import TokenManager from "../../api/TokenManager";
import FormDropdown from '../form/FormDropdown';
import AdminAPI from '../../api/AdminAPI';
import JournalistAPI from '../../api/JournalistAPI';
import UserAPI from '../../api/UserAPI';
import EditIcon from "../../assets/images/edit.png";
import UpdatePassword from './UpdatePassword';
import TextButton from '../form/TextButton';
import TextIconButton from '../form/TextIconButton';
import AccountValidation from '../../validation/AccountValidation';
import JournalistValidation from '../../validation/JournalistValidation';
import UserValidation from '../../validation/UserValidation';
import AdminValidation from '../../validation/AdminValidation';

function UpdateProfilePopup({ account }) {
  const [show, setShow] = useState(false);

  const [validationError, setValidationError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const useNavigation = useNavigate();

  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;

  // Configure Departments
  const departmentsList = [
    { value: "EDITORIAL", label: 'Editorial' },
    { value: "NEWSROOM", label: 'Newsroom' },
    { value: "COPYRIGHTING", label: 'Copyrighting' },
    { value: "LAYOUT_DESIGN", label: 'Layout Design' },
    { value: "ADVERTISING_MARKETING", label: 'Advertising & Marketing' },
    { value: "ONLINE", label: 'Online' },
  ];

  // Account with fields that are common for all account types
  const initialAccount = {
    id: account.id,
    fullName: account.fullName,
    username: account.username,
    email: account.email,
    dateOfBirth: account.dateOfBirth,
    profilePicture: account.profilePicture,
    password: account.password
  };

  // Type-specific fields based on role
  const specificAccountType =
    role === "ADMIN"
      ? {
          company: account.company
        }
    : role === "JOURNALIST"
      ? {
          department: account.department
        }
    : role === "USER"
      ? {
          bio: account.bio
        }
    : null;

  // Combine common fields with user-type specific fields
  const combinedAccount = { ...initialAccount, ...specificAccountType };
  
  const [updatedAccount, setUpdatedAccount] = useState({
    ...combinedAccount
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount({
      ...updatedAccount,
      [name]: value,
    });
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        setUpdatedAccount((prevAccount) => ({
          ...prevAccount,
          profilePicture: base64Data,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const validateAccount = () => {
    if (!AccountValidation.isFullNameValid(updatedAccount.fullName)) {
      setValidationError('Full name is required.');
      return false;
    }
  
    if (!AccountValidation.isFullNameLengthValid(updatedAccount.fullName)) {
      setValidationError('Full name length should be between 2 and 50 characters.');
      return false;
    }

    if (!AccountValidation.isEmailValid(updatedAccount.email)) {
      setValidationError('Email is required.');
      return false;
    }

    if(!AccountValidation.isDateOfBirthValid(updatedAccount.dateOfBirth)) {
      setValidationError('Date of birth is required.');
      return false;
    }

    return true;
  };

  const validateJournalist = () => {
    if(!JournalistValidation.isDepartmentValid(updatedAccount.department)) {
      setValidationError('Department is required.');
      return false;
    }
  
    return true;
  };

  const validateUser = () => {
    if(!UserValidation.isBioValid(updatedAccount.bio)) {
      setValidationError('Bio is required.');
      return false;
    }

    if(!UserValidation.isBioLengthValid(updatedAccount.bio)) {
      setValidationError('Bio length should be between 2 and 500 characters.');
      return false;
    }
  
    return true;
  }

  const validateAdmin = () => {
    if(!AdminValidation.isCompanyValid(updatedAccount.company)) {
      setValidationError('Company is required.');
      return false;
    }

    if(!AdminValidation.isCompanyLengthValid(updatedAccount.company)) {
      setValidationError('Company length should be between 2 and 50 characters.');
      return false;
    }
  
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormSubmitted(true);
      const isAccountValid = validateAccount();

      if(isAccountValid) {
        if(role === "ADMIN") {
          const isAdminValid = validateAdmin();

          if(isAdminValid) {
            await AdminAPI.putAdmin(updatedAccount);
            useNavigation("/account");
            window.location.reload();
          }
        } else if(role === "JOURNALIST") {
          const isJournalistValid = validateJournalist();

          if(isJournalistValid) {
            await JournalistAPI.putJournalist(updatedAccount);
            useNavigation("/account");
            window.location.reload();
          }
        } else if(role === "USER") {
          const isUserValid = validateUser();

          if(isUserValid) {
            await UserAPI.putUser(updatedAccount);
            useNavigation("/account");
            window.location.reload();
          }
        } else {
          console.error("Invalid account type");
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Error updating account:", error);
        alert("Error updating account: Something went wrong");
      }
    }
  };

  return (
    <>
      <TextIconButton icon={EditIcon} text="Update Account" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal-width-small">
        <Modal.Header>
          <Modal.Title>Update Account</Modal.Title>
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
          <h6>Username: <b>{updatedAccount.username}</b></h6>
          <br/>
          <Form onSubmit={handleSubmit} className="form">
            <Row>
              <Col>
                <FormTextControl
                  label="Full Name*"
                  type="text"
                  name="fullName"
                  value={updatedAccount.fullName}
                  onChangeHandler={handleChange}
                />

                <FormTextControl
                  label="Email*"
                  type="email"
                  name="email"
                  value={updatedAccount.email}
                  onChangeHandler={handleChange}
                />
              </Col>
              <Col>
              
                <FormTextControl
                  label="Date Of Birth*"
                  type="date"
                  name="dateOfBirth"
                  value={updatedAccount.dateOfBirth}
                  onChangeHandler={handleChange}
                />

            {role === "ADMIN" ? (
              <FormTextControl
                label="Company*"
                type="text"
                name="company"
                value={updatedAccount.company}
                onChangeHandler={handleChange}
              />
            ) : role === "JOURNALIST" ? (
              <FormDropdown
                value={updatedAccount.department}
                onChangeHandler={handleChange}
                options={departmentsList} 
                title="Department*"
                name="department"
              />
            ) : role === "USER" ? (
              <FormTextArea
                  label="Bio*"
                  name="bio"
                  value={updatedAccount.bio}
                  rows={3}
                  onChangeHandler={handleChange}
              />
            ) : null}
              </Col>
            </Row>

            <FormFileUploadInput
              label="Upload Profile Picture"
              onChangeHandler={handleProfilePictureChange}
              currentFile={updatedAccount.profilePicture}
            />

            <MainSubmitButton title="Update" link="/" />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateProfilePopup;