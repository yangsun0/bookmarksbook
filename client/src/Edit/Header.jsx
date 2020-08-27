import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useBookmarkFormStore } from "../Store";

function Header() {
  const { t } = useTranslation();
  const store = useBookmarkFormStore();

  const openBookmarkModal = (event: SyntheticEvent<HTMLButtonElement>) => {
    store.openModal();
  };

  return (
    <Row className="py-2" role="toolbar">
      <Col>
        <Button variant="outline-secondary" size="sm" as={Link} to="/">
          {t("button.back")}
        </Button>
      </Col>
      <Col xs="auto">
        <Button variant="outline-secondary" size="sm" className="mr-2">
          {t("button.newGroup")}
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={openBookmarkModal}
        >
          {t("button.newBookmark")}
        </Button>
      </Col>
    </Row>
  );
}

export default Header;
