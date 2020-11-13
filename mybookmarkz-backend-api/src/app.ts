import express = require("express");
import morgan = require("morgan");
import authorization from "./authorization";
import bookmarks from "./bookmark";
import Config from "./config";
import signIn from "./signIn";
import cookieParser = require("cookie-parser");

class App {
  private readonly config: Config;

  constructor() {
    this.config = new Config();
  }

  run(): void {
    const expressApp = express();
    // http log
    expressApp.use(morgan(this.config.httpLogFormat));
    // json parser for request body
    expressApp.use(express.json());
    // parser for request cookies
    expressApp.use(cookieParser());
    // sign in router, no authentication for this path
    expressApp.use("/signin", signIn);
    // authenticate all the other paths
    expressApp.use(authorization);
    // bookmarks router
    expressApp.use("/bookmarks", bookmarks);
    expressApp.listen(this.config.port, () => {
      console.log("server listen to port:", this.config.port);
    });
  }
}

export default App;
