import React from "react";
import { Modal } from "react-bootstrap";
import type {
  Bookmark,
  ButtonClickHandler,
  SaveBookmarkHandler,
} from "../App/Types";
import BookmarkForm from "./BookmarkForm";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
  onSubmit?: SaveBookmarkHandler,
  data?: Bookmark,
};

function BookmarkModal(props: Props) {
  const { show, onClose, onSubmit, data } = props;
  const handleSubmit = (bookmark) => {
    if (onSubmit) {
      onSubmit(bookmark);
    }
  };
  return (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={show}
      onHide={onClose}
      aria-label="bookmark modal"
    >
      <BookmarkForm onClose={onClose} onSubmit={handleSubmit} data={data} />
    </Modal>
  );
}

export default BookmarkModal;
