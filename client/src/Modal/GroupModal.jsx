import { useObserver } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import GroupForm from "../Form/GroupForm";
import useStore from "../Store/useStore";

function GroupModal() {
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
      <GroupForm onClose={closeModal} />
    </Modal>
  ));
}

export default GroupModal;
