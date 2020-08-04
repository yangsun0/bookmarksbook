import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");
if (root != null) {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback="Loading">
          <App />
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>,
    root
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
