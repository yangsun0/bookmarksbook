import React from "react";
import { Route, Switch } from "react-router-dom";
import EditPage from "../Edit";
import HomePage from "../Home";
import Loading from "./Loading";

function Main() {
  return (
    <main className="main">
      <Switch>
        <Route path="/edit">
          <Loading>
            <EditPage />
          </Loading>
        </Route>
        <Route path="/">
          <Loading>
            <HomePage />
          </Loading>
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
