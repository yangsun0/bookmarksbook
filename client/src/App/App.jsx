import React from "react";
import Edit from "../Edit";
import Home from "../Home";
import Navigation from "./Navigation";

function App() {
  let data = {
    groups: [
      {
        id: 1,
        name: "Favorite",
        column: 1,
        bookmarkList: [
          {
            id: 1,
            name: "Google",
            url: "https://www.google.com",
            iconUrl: "https://www.google.com/favicon.ico",
          },
          {
            id: 2,
            name: "Google",
            url: "https://www.google.com",
            iconUrl: "https://www.google.com/favicon.ico",
          },
        ],
      },
      {
        id: 2,
        name: "Favorite",
        column: 2,
        bookmarkList: [
          {
            id: 1,
            name: "Google",
            url: "https://www.google.com",
            iconUrl: "https://www.google.com/favicon.ico",
          },
          {
            id: 2,
            name: "Google",
            url: "https://www.google.com",
            iconUrl: "https://www.google.com/favicon.ico",
          },
        ],
      },
    ],
  };
  return (
    <>
      <Navigation />
      <Home groups={data.groups} />
      <Edit groups={data.groups} />
    </>
  );
}

export default App;
