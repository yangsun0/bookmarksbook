import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useBookmarkModalStore, useGroupModalStore } from "../Store/useStore";

function Header() {
  const { t } = useTranslation();
  const bookmarkModalStore = useBookmarkModalStore();
  const groupModalStore = useGroupModalStore();

  const openBookmarkModal = (event: SyntheticEvent<HTMLButtonElement>) => {
    bookmarkModalStore.open();
  };

  const openGroupModal = (event: SyntheticEvent<HTMLButtonElement>) => {
    groupModalStore.open();
  };

  return (
    <Row className="py-2" role="toolbar">
      <Col>
        <Button variant="outline-secondary" size="sm" as={Link} to="/">
          {t("button.back")}
        </Button>
      </Col>
      <Col xs="auto">
        <Button
          variant="outline-secondary"
          size="sm"
          className="mr-2"
          onClick={openGroupModal}
        >
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
