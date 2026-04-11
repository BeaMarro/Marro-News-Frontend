import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import ArticleAPI from '../../api/ArticleAPI';
import DeleteIcon from "../../assets/images/delete.png";
import IconButton from '../form/IconButton';

function DeleteArticlePopup({ articleId }) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useNavigation = useNavigate();

  const handleDelete = async () => {
    try {
      await ArticleAPI.deleteArticle(articleId);
      useNavigation("/manage-articles");
      window.location.reload(); // Reloads the page once it is loaded
      handleClose(); // Close popup
    } catch (error) {
        console.error("An error occurred while deleting the article"); 
      }
      handleClose();
    }

  return (
    <>
      <IconButton image={DeleteIcon} onClick={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete this article?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deleting an article is permanent
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary"> {/* Uses handler for closing the popup */}
            Close
          </Button>
          <Button onClick={handleDelete} variant="primary"> {/* Uses handler for deleting the article */}
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteArticlePopup;
