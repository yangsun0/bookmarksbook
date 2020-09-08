import { useObserver } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import BookmarkForm from "../Form/BookmarkForm";
import { useBookmarkModalStore } from "../Store/useStore";

function BookmarkModal() {
  const store = useBookmarkModalStore();

  const close = () => {
    store.close();
  };

  return useObserver(() => (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={store.isShown}
      onHide={close}
      aria-labelledby="bookmark-modal-title"
    >
      <BookmarkForm onClose={close} />
    </Modal>
  ));
}

export default BookmarkModal;
