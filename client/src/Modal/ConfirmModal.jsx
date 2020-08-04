import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import type { ButtonClickHandler } from "../Common/Types";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
};
function ConfirmModal(props: Props) {
  const { show, onClose } = props;
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={onClose} aria-labelledby="confirm-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="confirm-modal-title">
          {t("dialog.confirm")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("dialog.confirmMessage")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t("button.no")}
        </Button>
        <Button variant="primary">{t("button.delete")}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
