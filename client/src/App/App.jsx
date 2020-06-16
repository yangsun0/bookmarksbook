import React from "react";
import { Route, Switch } from "react-router-dom";
import EditPage from "../Edit";
import HomePage from "../Home";
import Navigation from "./Navigation";
import type { AppData } from "./Types";

function App() {
  let data: AppData = {
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
      <Switch>
        <Route path="/edit">
          <EditPage groups={data.groups} />
        </Route>
        <Route path="/">
          <HomePage groups={data.groups} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
