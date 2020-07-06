import React from "react";
import { Modal } from "react-bootstrap";
import type {
  Bookmark,
  ButtonClickHandler,
  SaveBookmarkHandler,
} from "../Common/Types";
import BookmarkForm from "./BookmarkForm";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
  onSave: SaveBookmarkHandler,
  data?: Bookmark,
};

function BookmarkModal(props: Props) {
  const { show, onClose, onSave, data } = props;

  return (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={show}
      onHide={onClose}
      aria-label="bookmark modal"
    >
      <BookmarkForm onClose={onClose} onSubmit={onSave} data={data} />
    </Modal>
  );
}

export default BookmarkModal;
