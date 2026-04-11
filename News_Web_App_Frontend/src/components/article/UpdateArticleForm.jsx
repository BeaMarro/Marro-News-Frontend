import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import MainSubmitButton from '../form/MainSubmitButton';
import ArticleAPI from '../../api/ArticleAPI';
import "../../styles/CreateArticleForm.css";
import "../../styles/MainButton.css";
import UpdateButton from '../form/UpdateButton';
import FormTextControl from '../form/FormTextControl';
import FormGenreDropdown from '../form/FormDropdown';
import FormTextArea from '../form/FormTextArea';
import FormFileUploadInput from '../form/FormFileUploadInput';
import ArticleValidation from '../../validation/ArticleValidation';
import PopoverButton from '../form/PopoverButton';

function UpdateArticleForm({article}) {
  const [show, setShow] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useNavigation = useNavigate();

  // Configure Genres
  const genreList = [
    { value: "BREAKING_NEWS", label: "Breaking News" },
    { value: "SCIENCE", label: "Science" },
    { value: "ART", label: "Art" },
    { value: "POLITICS", label: "Politics" },
    { value: "GOVERNMENT", label: "Government" },
    { value: "TECHNOLOGY", label: "Technology" },
    { value: "BUSINESS_ECONOMICS", label: "Business & Economics" },
    { value: "HEALTH_WELLNESS", label: "Health & Wellness" },
    { value: "ENTERTAINMENT", label: "Entertainment" },
    { value: "SPORT", label: "Sport" },
    { value: "TRAVEL", label: "Travel" },
  ];

  const [updatedArticle, setUpdatedArticle] = useState({
      id: article.id,
      heading: article.heading,
      text: article.text,
      coverImage: article.coverImage,
      authorId: article.author.id,
      genre: article.genre,
      video: article.video
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedArticle((prevArticle) => ({
        ...prevArticle,
        [name]: name === 'video' && value === '' ? null : value,
    }));
};

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Base 64 conversion of the image
        const base64Data = reader.result.split(",")[1];
  
        setUpdatedArticle((prevArticle) => ({
          ...prevArticle,
          coverImage: base64Data,
        }));
      };
  
      reader.readAsDataURL(file);
    }
  };

  const validateArticle = () => {
    if (!ArticleValidation.isHeadingValid(updatedArticle.heading)) {
      setValidationError('Heading is required.');
      return false;
    }
  
    if (!ArticleValidation.isHeadingLengthValid(updatedArticle.heading)) {
      setValidationError('Heading length should be between 2 and 200 characters.');
      return false;
    }
  
    if (!ArticleValidation.isArticleTextValid(updatedArticle.text)) {
      setValidationError('Text is required.');
      return false;
    }
  
    if (!ArticleValidation.isArticleTextLengthValid(updatedArticle.text)) {
      setValidationError('Text length should be between 50 and 1000 characters.');
      return false;
    }

    if(!ArticleValidation.isGenreValid(updatedArticle.genre)) {
      setValidationError('Genre is required.');
      return false;
    }

    if(!ArticleValidation.isCoverImageValid(updatedArticle.coverImage)) {
      setValidationError('Cover Image is required.');
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => { // Submit event handle -> When the form is submitted
      e.preventDefault(); // This prevents default actions from happening: Prevents submit from occurring at unwanted time

      setFormSubmitted(true);

      try {
        const isArticleValid = validateArticle();
        if (isArticleValid) {
          await ArticleAPI.putArticle(updatedArticle);
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
      <UpdateButton onClick={handleShow}/>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal-width">
        <Modal.Header>
          <Modal.Title>Update Article</Modal.Title>
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
            <Row>
                <Col>
                    <FormTextControl
                     label="Heading*"
                     type="text" 
                     name="heading"
                     value={updatedArticle.heading}
                     onChangeHandler={handleChange}
                     isRequired={false}
                    />
                </Col>
                <Col>
                    <FormGenreDropdown
                     value={updatedArticle.genre} 
                     onChangeHandler={handleChange} 
                     options={genreList} 
                     title="Genre*" 
                     name="genre"
                    />
                </Col>
            </Row>

            <FormTextArea
             label="Text*"
             name="text" 
             value={updatedArticle.text} 
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
                  value={updatedArticle.video}
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
              label="Upload Cover Image"
              onChangeHandler={handleCoverImageChange}
              currentFile={updatedArticle.coverImage}
            />

            <MainSubmitButton
             title="Update" 
             link="/"
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateArticleForm;