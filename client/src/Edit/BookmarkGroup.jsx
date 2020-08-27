import { useObserver } from "mobx-react-lite";
import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useBookmarkFormStore, useGroupFormStore } from "../Store";
import type { Bookmark, Group } from "../Store";

type Props = {
  group: Group,
};

type BookmarkViewProps = {
  bookmark: Bookmark,
};

function BookmarkView(props: BookmarkViewProps) {
  const { bookmark } = props;
  const { t } = useTranslation();
  const bookmarkFormStore = useBookmarkFormStore();

  const openBookmarkModal = (event: SyntheticEvent<HTMLButtonElement>) => {
    bookmarkFormStore.openModal(event.currentTarget.dataset.id);
  };

  const openConfirmModal = () => {};

  return useObserver(() => (
    <ListGroup.Item>
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
}

function BookmarkGroup(props: Props) {
  const { group } = props;
  const { t } = useTranslation();
  const groupFormStore = useGroupFormStore();

  const openGroupModal = (event: SyntheticEvent<HTMLButtonElement>) => {
    groupFormStore.openModal(event.currentTarget.dataset.id);
  };
  const openConfirmModal = () => {};

  return useObserver(() => (
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
      <ListGroup>
        {group.bookmarks.map((bookmark) => (
          <BookmarkView bookmark={bookmark} key={bookmark.id} />
        ))}
      </ListGroup>
    </Card>
  ));
}

export default BookmarkGroup;
