import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import type { Bookmark, Group } from "../App/Types";

type Props = {
  group: Group,
};

function BookmarkGroup(props: Props) {
  const { group } = props;
  const items = group.bookmarkList.map((bookmark: Bookmark) => (
    <ListGroup.Item action href={bookmark.url} key={bookmark.id}>
      <img src={bookmark.iconUrl} alt="icon" className="bookmark-icon" />
      <span className="align-middle">{bookmark.name}</span>
    </ListGroup.Item>
  ));

  return (
    <Card className="bookmark-group">
      <Card.Header>{group.name}</Card.Header>
      <ListGroup>{items}</ListGroup>
    </Card>
  );
}

export default BookmarkGroup;
