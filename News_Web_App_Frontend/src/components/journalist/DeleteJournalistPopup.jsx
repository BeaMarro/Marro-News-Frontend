import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'; 
import JournalistAPI from '../../api/JournalistAPI';
import DeleteButton from '../form/DeleteButton';

function DeleteJournalistPopup({ journalistId }) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useNavigation = useNavigate();

  const handleDelete = async () => {
    try {
      await JournalistAPI.deleteJournalist(journalistId);
      useNavigation("/journalists");
      window.location.reload(); // Reloads the page once it is loaded
      handleClose(); // Close popup
    } catch (error) {
        console.error("An error occurred while deleting the journalist"); 
      }
      handleClose();
    }

  return (
    <>
      <DeleteButton onClick={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to remove this journalist?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Removing a journalist is permanent
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

export default DeleteJournalistPopup;
