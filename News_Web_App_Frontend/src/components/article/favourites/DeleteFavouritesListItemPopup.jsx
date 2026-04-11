import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../../form/DeleteButton';
import FavouritesListAPI from '../../../api/FavouritesListAPI';
import TokenManager from '../../../api/TokenManager';

function DeleteFavouritesListItemPopup({ articleId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useNavigation = useNavigate();

  const handleDelete = async () => {
    try {
      await FavouritesListAPI.deleteFavouritesListArticle(articleId);
      useNavigation("/favourites");
      window.location.reload(); // Reloads the page once it is loaded
      handleClose(); // Close popup
    } catch (error) {
        console.error("An error occurred while deleting the article"); 
      }
      handleClose();
    }

  return (
    <>
      <DeleteButton onClick={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to remove this article from your favourites list?
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

export default DeleteFavouritesListItemPopup;
