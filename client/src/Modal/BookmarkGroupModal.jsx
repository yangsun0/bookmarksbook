import React from "react";
import { Modal } from "react-bootstrap";
import type {
  ButtonClickHandler,
  Group,
  SaveGroupHandler,
} from "../Common/Types";
import BookmarkGroupForm from "./BookmarkGroupForm";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
  onSave: SaveGroupHandler,
  data?: Group,
};

function BookmarkGroupModal(props: Props) {
  const { show, onClose, onSave, data } = props;

  return (
    <Modal
      centered
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="group-modal-title"
    >
      <BookmarkGroupForm
        onClose={onClose}
        show={show}
        onSubmit={onSave}
        data={data}
      />
    </Modal>
  );
}

export default BookmarkGroupModal;
