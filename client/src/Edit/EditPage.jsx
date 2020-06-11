import React from "react";
import { Container } from "react-bootstrap";
import { withRoute } from "../Utils/Route";
import Body from "./Body";
import Header from "./Header";

function EditPage(props) {
  return (
    <Container className="main-container">
      <Header />
      <Body groups={props.groups} />
    </Container>
  );
}

const EditPageWithRoute = withRoute(EditPage, "/edit");

export default EditPageWithRoute;
