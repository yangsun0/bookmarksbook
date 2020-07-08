import React from "react";
import { Button, Modal } from "react-bootstrap";
import type { ButtonClickHandler } from "../Common/Types";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
};
function ConfirmModal(props: Props) {
  const { show, onClose } = props;
  return (
    <Modal show={show} onHide={onClose} aria-labelledby="confirm-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="confirm-modal-title">Confirm</Modal.Title>
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
