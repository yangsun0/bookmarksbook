import { useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { useSignInStore } from "../Store/useStore";

function SignInModal() {
  const { t } = useTranslation();
  const store = useSignInStore();
  const close = () => {
    store.close();
  };

  useEffect(() => {
    if (store.isShown) {
      store.signIn();
    }
  }, [store, store.isShown]);

  return useObserver(() => (
    <Modal
      centered
      size="md"
      show={store.isShown}
      onHide={close}
      aria-labelledby="signin-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="signin-modal-title">{t("dialog.signin")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="pt-3 pb-3">
          <Row className="justify-content-center">
            <Col xs="auto">
              <div id={store.googleButtonId} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row className="justify-content-xs-center">
            <Col>
              <p className="text-center font-weight-light small">
                <Trans i18nKey="dialog.agree">
                  Click "Sign In" to agree to MyBookmarkz's
                  <a href="/">Terms of Service</a>
                  <br />
                  and acknowledge that MyBookmarkz's
                  <a href="/">Privacy Policy</a>
                  <br />
                  applies to you.
                </Trans>
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  ));
}

export default SignInModal;
