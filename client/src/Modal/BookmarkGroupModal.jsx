import { useObserver } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import useStore from "../Store/useStore";
import BookmarkGroupForm from "./BookmarkGroupForm";

function BookmarkGroupModal() {
  const store = useStore();
  const closeModal = () => {
    store.closeGroupModal();
  };

  return useObserver(() => (
    <Modal
      centered
      size="lg"
      show={store.isGroupModalShown}
      onHide={closeModal}
      aria-labelledby="group-modal-title"
    >
      <BookmarkGroupForm onClose={closeModal} />
    </Modal>
  ));
}

export default BookmarkGroupModal;
