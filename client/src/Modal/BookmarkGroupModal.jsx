import { useObserver } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import useStore from "../Store/useStore";
import BookmarkGroupForm from "./BookmarkGroupForm";

function BookmarkGroupModal() {
  const store = useStore().groupFormStore;
  const closeModal = () => {
    store.closeModal();
  };

  return useObserver(() => (
    <Modal
      centered
      size="lg"
      show={store.isModalShown}
      onHide={closeModal}
      aria-labelledby="group-modal-title"
    >
      <BookmarkGroupForm onClose={closeModal} />
    </Modal>
  ));
}

export default BookmarkGroupModal;
