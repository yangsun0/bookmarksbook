import React from "react";
import { Container } from "react-bootstrap";
import BookmarkGroupModal from "../Modal/BookmarkGroupModal";
import BookmarkModal from "../Modal/BookmarkModal";
import ConfirmModal from "../Modal/ConfirmModal";
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
      <BookmarkGroupModal />
      <ConfirmModal />
    </>
  );
}

export default EditPage;
