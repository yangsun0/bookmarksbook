import React from "react";
import Navigation from "./Navigation";
import Body from "./Body";
import "./Home.scss";
import EditBookmarkModal from "./EditBookmarkModal";
import EditGroupModal from "./EditGroupModal";
import ConfirmModal from "./ConfirmModal";

function Home() {
  return (
    <>
      <Navigation />
      <Body />
      <EditBookmarkModal />
      <EditGroupModal />
      <ConfirmModal />
    </>
  );
}

export default Home;
