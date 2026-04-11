import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import ApprovalAPI from '../../../api/ApprovalAPI';
import ApproveButton from '../../form/ApproveButton';

function ApproveArticlePopup({ articleId }) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useNavigation = useNavigate();

  const handleApprove = async () => {
    try {
      await ApprovalAPI.approveArticle(articleId);
      useNavigation("/approval-requests");
      window.location.reload(); // Reloads the page once it is loaded
      handleClose(); // Close popup
    } catch (error) {
        console.error("An error occurred while setting the article status to approved: " + error); 
      }
      handleClose();
    }

  return (
    <>
      <ApproveButton onClick={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to set this article to <b>approved</b>?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          When the status of an article is set to approved, it will be available to end-users via the web application
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary"> {/* Uses handler for closing the popup */}
            Close
          </Button>
          <Button onClick={handleApprove} variant="primary"> {/* Uses handler for approving the article */}
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApproveArticlePopup;
