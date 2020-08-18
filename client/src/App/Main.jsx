import React from "react";
import { Route, Switch } from "react-router-dom";
import EditPage from "../Edit";
import HomePage from "../Home";

function Main() {
  return (
    <main className="main">
      <Switch>
        <Route path="/edit">
          <EditPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
