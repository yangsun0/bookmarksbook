import type { $Application, $Request, $Response } from "express";

const express = require("express");
const bookmarks = require("./bookmark");
const logger = require("./logging");

type Config = {
  port: number,
};

class App {
  port: number;

  init(config: Config) {
    this.port = config.port;
  }

  run() {
    const app: $Application<$Request, $Response> = express();

    app.use(logger);
    app.use("/bookmarks", bookmarks);

    app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`server listen to port: ${this.port}`);
    });
  }
}

module.exports = App;
