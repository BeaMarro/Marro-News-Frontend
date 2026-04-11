import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TokenManager from '../../api/TokenManager';
import AdminAPI from '../../api/AdminAPI';
import UserAPI from '../../api/UserAPI';
import DeleteIcon from "../../assets/images/delete.png";
import TextIconButton from '../form/TextIconButton';

function DeleteProfilePopup() {
  const isLoggedIn = TokenManager.getClaims() !== undefined;
  const role = isLoggedIn ? TokenManager.getClaims().role : null;
  const accountId = isLoggedIn ? TokenManager.getClaims().accountId : null;

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useNavigation = useNavigate();

  const handleDelete = async () => {
    try {
      if(isLoggedIn) {
        if(role === "ADMIN") {
            await AdminAPI.deleteAdmin(accountId);
        } else if(role === "USER") {
            await UserAPI.deleteUser(accountId);
        } else {
            console.error("Invalid Account Type");
        }
        TokenManager.clear(); // Log out user by clearing sessions
        useNavigation("/login");
        window.location.reload(); // Reloads the page once it is loaded
        handleClose(); // Close popup
      }
    } catch (error) {
        console.error("An error occurred while deleting the journalist"); 
      }
      handleClose();
    }

  return (
    <>
        {role !== "JOURNALIST" && <TextIconButton icon={DeleteIcon} text="Delete Account" onClick={handleShow} />}

        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Deleting your account is permanent and will lead to all of your data being permanently deleted from Marro News
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleClose} variant="secondary">
                Close
            </Button>
            <Button onClick={handleDelete} variant="primary">
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default DeleteProfilePopup;
