import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import type {
  ButtonClickHandler,
  Group,
  SaveBookmarkHandler,
  SaveGroupHandler,
} from "../Common/Types";

type Props = {
  group: Group,
  onGroupEdit: SaveGroupHandler,
  onBookmarkEdit: SaveBookmarkHandler,
  onDelete: ButtonClickHandler,
};

function BookmarkGroup(props: Props) {
  const { group, onGroupEdit, onBookmarkEdit, onDelete } = props;
  const { t } = useTranslation();

  const items = group.bookmarkList.map((bookmark) => (
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
            onClick={() => onBookmarkEdit(bookmark)}
          >
            {t("button.edit")}
          </Button>
          <Button variant="link" size="sm" onClick={onDelete}>
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
            <Button variant="link" size="sm" onClick={() => onGroupEdit(group)}>
              {t("button.edit")}
            </Button>
            <Button variant="link" size="sm" onClick={onDelete}>
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
