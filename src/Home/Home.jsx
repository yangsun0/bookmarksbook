import React from "react";
import Navigation from "./Navigation";
import Body from "./Body";
import "./Home.scss";
import NewBookMarkModal from "./NewBookMarkModal";

function Home() {
  return (
    <>
      <Navigation />
      <Body />
      <NewBookMarkModal show={true} />
    </>
  );
}

export default Home;
