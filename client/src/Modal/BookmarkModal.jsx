import { useObserver } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import useStore from "../Store/useStore";
import BookmarkForm from "./BookmarkForm";

function BookmarkModal() {
  const store = useStore();

  const closeModal = () => {
    store.closeBookmarkModal();
  };

  return useObserver(() => (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={store.isBookmarkModalShown}
      onHide={closeModal}
      aria-labelledby="bookmark-modal-title"
    >
      <BookmarkForm onClose={closeModal} />
    </Modal>
  ));
}

export default BookmarkModal;
