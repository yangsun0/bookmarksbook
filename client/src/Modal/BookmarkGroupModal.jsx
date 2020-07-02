import React from "react";
import { Modal } from "react-bootstrap";
import type { ButtonClickHandler, SaveGroupHandler } from "../App/Types";
import BookmarkGroupForm from "./BookmarkGroupForm";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
  onSubmit?: SaveGroupHandler,
};

function BookmarkGroupModal(props: Props) {
  const { show, onClose, onSubmit } = props;
  const handleSubmit = (group) => {
    alert(JSON.stringify(group, null, 2));
    if (onSubmit) {
      onSubmit(group);
    }
  };
  return (
    <Modal
      centered
      size="lg"
      show={show}
      onHide={onClose}
      aria-label="bookmark group modal"
    >
      <BookmarkGroupForm
        onClose={onClose}
        show={show}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

export default BookmarkGroupModal;
