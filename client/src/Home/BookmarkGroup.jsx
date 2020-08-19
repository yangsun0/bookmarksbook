import { useObserver } from "mobx-react-lite";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import type { Bookmark, Group } from "../Store";

type Props = {
  group: Group,
};

type BookmarkProps = {
  bookmark: Bookmark,
};

function BookmarkView(props: BookmarkProps) {
  const { bookmark } = props;
  return useObserver(() => (
    <ListGroup.Item action href={bookmark.url}>
      <img src={bookmark.iconUrl} alt="icon" className="bookmark-icon mr-2" />
      <span className="align-middle">{bookmark.name}</span>
    </ListGroup.Item>
  ));
}

function BookmarkGroup(props: Props) {
  const { group } = props;
  const items = group.bookmarks.map((bookmark: Bookmark) => (
    <BookmarkView bookmark={bookmark} key={bookmark.id} />
  ));

  return useObserver(() => (
    <Card className="mb-3" role="region" aria-label="bookmark group">
      <Card.Header role="heading" aria-level="2">
        {group.name}
      </Card.Header>
      <ListGroup>{items}</ListGroup>
    </Card>
  ));
}

export default BookmarkGroup;
