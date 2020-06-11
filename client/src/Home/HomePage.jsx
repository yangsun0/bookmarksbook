import React from "react";
import { Container } from "react-bootstrap";
import { withRoute } from "../Utils/Route";
import Body from "./Body";
import Header from "./Header";
import "./Home.scss";

function HomePage(props) {
  return (
    <Container className="main-container">
      <Header />
      <Body groups={props.groups} />
    </Container>
  );
}

const HomePageWithRoute = withRoute(HomePage, "/");

export default HomePageWithRoute;
