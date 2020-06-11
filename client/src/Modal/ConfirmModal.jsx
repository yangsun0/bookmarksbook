import React from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete the bookmark?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="primary">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
