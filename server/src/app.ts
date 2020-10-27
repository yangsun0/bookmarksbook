import express = require("express");
import bookmarkRouter from "./bookmark";
import logger from "./logging";

type Config = {
  port: number;
};

class App {
  public port: number;

  constructor() {
    this.port = 3000;
  }

  init(config: Config): void {
    this.port = config.port;
  }

  run(): void {
    const app = express();
    app.use(logger);
    app.use("/bookmarks", bookmarkRouter);
    app.listen(this.port, () => {
      console.log("server listen to port:", this.port);
    });
  }
}

export default App;
