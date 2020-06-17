import React from "react";
import { Route, Switch } from "react-router-dom";
import EditPage from "../Edit";
import HomePage from "../Home";
import type { AppData } from "./Types";

type Props = {
  data: AppData,
};

function Main(props: Props) {
  const { data } = props;
  return (
    <main className="main">
      <Switch>
        <Route path="/edit">
          <EditPage groups={data.groups} />
        </Route>
        <Route path="/">
          <HomePage groups={data.groups} />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
