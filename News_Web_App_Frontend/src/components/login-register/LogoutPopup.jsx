import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TokenManager from '../../api/TokenManager';

function LogoutPopup() {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
        TokenManager.clear(); // Log out user by clearing sessions
        navigate('/account');
        window.location.reload();
        handleClose();
    } catch (error) {
        alert("An error occurred while logging you out")
      }
    }

  return (
    <>
      <Button className="m-2" onClick={handleShow}>
        Log out
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to <b>log out</b>?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleLogout} variant="primary">
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogoutPopup;
