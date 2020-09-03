import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useBookmarkModalStore } from "../Store/useStore";
function Header() {
  const { t } = useTranslation();
  const bookmarkModalStore = useBookmarkModalStore();

  const openBookmarkModal = (event: SyntheticEvent<HTMLButtonElement>) => {
    bookmarkModalStore.open();
  };

  return (
    <>
      <Row className="py-2" role="toolbar">
        <Col>
          <Form>
            <Form.Check
              type="switch"
              id="openInNew"
              inline
              className="align-middle child-cursor-pointer"
            >
              <Form.Check.Input />
              <Form.Check.Label>
                <span className="d-none d-sm-block">{t("button.newTab")}</span>
              </Form.Check.Label>
            </Form.Check>
            <FiExternalLink />
          </Form>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-secondary"
            size="sm"
            className="mr-2"
            as={Link}
            to="/edit"
          >
            {t("button.edit")}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={openBookmarkModal}
          >
            {t("button.new")}
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
