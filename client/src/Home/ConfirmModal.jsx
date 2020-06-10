import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmModal() {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete the bookmark?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">No</Button>
        <Button variant="primary">Delete</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default ConfirmModal;
