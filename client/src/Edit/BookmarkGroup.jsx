import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import type { Group } from "../Store/AppStore";
import useStore from "../Store/useStore";

type Props = {
  group: Group,
};

function BookmarkGroup(props: Props) {
  const { group } = props;
  const { t } = useTranslation();
  const store = useStore();

  const openBookmarkModal = (event: SyntheticEvent<HTMLButtonElement>) => {
    store.openBookmarkModal(event.currentTarget.dataset.id);
  };

  const openGroupModal = (event: SyntheticEvent<HTMLButtonElement>) => {
    store.openGroupModal(event.currentTarget.dataset.id);
  };

  const openConfirmModal = () => {
    store.openConfirmModal();
  };

  const items = group.bookmarks.map((bookmark) => (
    <ListGroup.Item key={bookmark.id}>
      <Row>
        <Col>
          <img
            src={bookmark.iconUrl}
            alt="icon"
            className="bookmark-icon mr-2"
          />
          <span className="align-middle">{bookmark.name}</span>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            size="sm"
            onClick={openBookmarkModal}
            data-id={bookmark.id}
          >
            {t("button.edit")}
          </Button>
          <Button variant="link" size="sm" onClick={openConfirmModal}>
            {t("button.delete")}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="small text-secondary">{bookmark.url}</span>
        </Col>
      </Row>
    </ListGroup.Item>
  ));

  return (
    <Card className="mb-3" role="region" aria-label="bookmark group">
      <Card.Header>
        <Row>
          <Col role="heading" aria-level="2">
            {group.name}
          </Col>
          <Col xs="auto">
            <Button
              variant="link"
              size="sm"
              onClick={openGroupModal}
              data-id={group.id}
            >
              {t("button.edit")}
            </Button>
            <Button variant="link" size="sm" onClick={openConfirmModal}>
              {t("button.delete")}
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <ListGroup>{items}</ListGroup>
    </Card>
  );
}

export default BookmarkGroup;
