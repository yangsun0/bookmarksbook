import React from "react";
import { Button, Modal } from "react-bootstrap";
import type { ButtonClickHandler } from "../App/Types";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
};
function ConfirmModal(props: Props) {
  const { show, onClose } = props;
  return (
    <Modal show={show} onHide={onClose} aria-label="confirm modal">
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
