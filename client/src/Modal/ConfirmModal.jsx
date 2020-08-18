import { useObserver } from "mobx-react-lite";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useStore from "../Store/useStore";

function ConfirmModal() {
  const { t } = useTranslation();
  const store = useStore();
  const close = () => {
    store.closeConfirmModal();
  };

  return useObserver(() => (
    <Modal
      show={store.isConfirmModalShown}
      onHide={close}
      aria-labelledby="confirm-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="confirm-modal-title">
          {t("dialog.confirm")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("dialog.confirmMessage")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          {t("button.no")}
        </Button>
        <Button variant="primary">{t("button.delete")}</Button>
      </Modal.Footer>
    </Modal>
  ));
}

export default ConfirmModal;
