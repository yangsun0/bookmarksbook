import { useObserver } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import GroupForm from "../Form/GroupForm";
import { useGroupModalStore } from "../Store/useStore";

function GroupModal() {
  const store = useGroupModalStore();

  const close = () => {
    store.close();
  };

  return useObserver(() => (
    <Modal
      centered
      size="lg"
      show={store.isShown}
      onHide={close}
      aria-labelledby="group-modal-title"
    >
      <GroupForm onClose={close} />
    </Modal>
  ));
}

export default GroupModal;
