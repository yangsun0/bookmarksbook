import React from "react";
import { Container } from "react-bootstrap";
import BookmarkModal from "../Modal/BookmarkModal";
import DeleteModal from "../Modal/DeleteModal";
import GroupModal from "../Modal/GroupModal";
import Body from "./Body";
import Header from "./Header";

function EditPage() {
  return (
    <>
      <Container>
        <Header />
        <Body />
      </Container>
      <BookmarkModal />
      <GroupModal />
      <DeleteModal />
    </>
  );
}

export default EditPage;
