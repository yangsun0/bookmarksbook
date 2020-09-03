import { useObserver } from "mobx-react-lite";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDeleteModalStore } from "../Store//useStore";

function DeleteModal() {
  const { t } = useTranslation();
  const store = useDeleteModalStore();
  const close = () => {
    store.close();
  };

  const deleteIt = () => {
    store.delete();
  };

  return useObserver(() => (
    <Modal
      show={store.isShown}
      onHide={close}
      aria-labelledby="confirm-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="confirm-modal-title">
          {t("dialog.deleteTitle", { target: store.targetKey })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("dialog.deleteMessage", { name: store.name })}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          {t("button.no")}
        </Button>
        <Button variant="primary" onClick={deleteIt}>
          {t("button.delete")}
        </Button>
      </Modal.Footer>
    </Modal>
  ));
}

export default DeleteModal;
