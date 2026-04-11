import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import MainSubmitButton from '../form/MainSubmitButton';
import ArticleAPI from '../../api/ArticleAPI';
import "../../styles/CreateArticleForm.css";
import "../../styles/MainButton.css";
import ArticleValidation from '../../validation/ArticleValidation';
import FormTextControl from '../form/FormTextControl';
import FormGenreDropdown from '../form/FormDropdown';
import FormTextArea from '../form/FormTextArea';
import TokenManager from '../../api/TokenManager';
import FormFileUploadInput from '../form/FormFileUploadInput';
import PopoverButton from '../form/PopoverButton';
import Alert from 'react-bootstrap/Alert';

function CreateArticleForm() {
  const [show, setShow] = useState(false);
  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const journalistId = isLoggedIn ? TokenManager.getClaims().accountId : null;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Configure Genres
  const genreList = [
    { value: 'BREAKING_NEWS', label: 'Breaking News' },
    { value: 'SCIENCE', label: 'Science' },
    { value: 'ART', label: 'Art' },
    { value: 'POLITICS', label: 'Politics' },
    { value: 'GOVERNMENT', label: 'Government' },
    { value: 'TECHNOLOGY', label: 'Technology' },
    { value: 'BUSINESS_ECONOMICS', label: 'Business & Economics' },
    { value: 'HEALTH_WELLNESS', label: 'Health & Wellness' },
    { value: 'ENTERTAINMENT', label: 'Entertainment' },
    { value: 'SPORT', label: 'Sport' },
    { value: 'TRAVEL', label: 'Travel' },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useNavigation = useNavigate();

  const [newArticle, setNewArticle] = useState({
    heading: '',
    text: '',
    authorId: journalistId,
    genre: '',
    video: null,
    coverImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];

        setNewArticle((prevArticle) => ({
          ...prevArticle,
          coverImage: base64Data,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const validateArticle = () => {
    if (!ArticleValidation.isHeadingValid(newArticle.heading)) {
      setValidationError('Heading is required.');
      return false;
    }
  
    if (!ArticleValidation.isHeadingLengthValid(newArticle.heading)) {
      setValidationError('Heading length should be between 2 and 200 characters.');
      return false;
    }
  
    if (!ArticleValidation.isArticleTextValid(newArticle.text)) {
      setValidationError('Text is required.');
      return false;
    }
  
    if (!ArticleValidation.isArticleTextLengthValid(newArticle.text)) {
      setValidationError('Text length should be between 50 and 1000 characters.');
      return false;
    }

    if(!ArticleValidation.isGenreValid(newArticle.genre)) {
      setValidationError('Genre is required.');
      return false;
    }

    if(!ArticleValidation.isCoverImageValid(newArticle.coverImage)) {
      setValidationError('Cover Image is required.');
      return false;
    }
  
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormSubmitted(true);

      const isArticleValid = validateArticle();
      if (isArticleValid) {
        await ArticleAPI.postArticle(newArticle);
        useNavigation('/manage-articles');
        window.location.reload();
      } else {
        console.log('Article validation failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle creating existing content
        setValidationError("An article with this heading already exists");
        return false;
      } else {
        console.error('Error posting article:', error);
        setValidationError("Error posting article: Something went wrong");
        return false;
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="submit">
        Create New Article
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal-width">
        <Modal.Header>
          <Modal.Title>Create New Article</Modal.Title>
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
                  label="Heading*"
                  type="text"
                  name="heading"
                  value={newArticle.heading}
                  onChangeHandler={handleChange}
                  isRequired={false}
                />
              </Col>
              <Col>
                <FormGenreDropdown
                  value={newArticle.genre}
                  onChangeHandler={handleChange}
                  options={genreList}
                  name="genre"
                  title="Genre*"
                />
              </Col>
            </Row>

            <FormTextArea
              label="Text*"
              name="text"
              value={newArticle.text}
              rows={10}
              onChangeHandler={handleChange}
              isRequired={false}
            />

          <Row className="align-items-center">
            <Col xs={11}>
              <FormTextControl
                label="Video Link"
                type="url"
                name="video"
                value={newArticle.video}
                onChangeHandler={handleChange}
                isRequired={false}
              />
            </Col>
            <Col xs={1}>
              <PopoverButton
                placeholder='?'
                title='Video Link Information'
                subtitle={(
                  <div>
                    Here are the steps that you need to follow to successfully embed a YouTube video:<br />
                    1. Go to YouTube (www.youtube.com) and click on the video that you wish to insert<br />
                    2. Go to embed, locate the embed video link and copy it onto the text box on this form
                  </div>
                )}
              />
            </Col>
          </Row>

          <FormFileUploadInput
            label="Upload Cover Image*"
            onChangeHandler={handleCoverImageChange}
            currentFile={null}
          />

            <MainSubmitButton
              title="Submit"
              link="/" 
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateArticleForm;