import cookieParser = require("cookie-parser");
import express = require("express");
import morgan = require("morgan");
import rateLimit = require("express-rate-limit");
import authorization from "./authorization";
import bookmarks from "./bookmark";
import Config from "./config";
import signIn from "./signIn";

class App {
  private readonly config: Config;

  constructor() {
    this.config = new Config();
  }

  public create(): express.Application {
    const expressApp = express();
    const limiter = rateLimit({
      windowMs: 60 * 1000,
      max: this.config.rateLimitMax,
    });
    // http log
    expressApp.use(morgan(this.config.httpLogFormat));
    // rate limit
    expressApp.use(limiter);
    // json parser for request body
    expressApp.use(express.json());
    // parser for request cookies
    expressApp.use(cookieParser());
    // sign in router, no authentication for this path
    expressApp.use("/api/signin", signIn);
    // authenticate all the other paths
    expressApp.use(authorization);
    // bookmarks router
    expressApp.use("/api/bookmarks", bookmarks);

    return expressApp;
  }

  public run(): void {
    const expressApp = this.create();
    expressApp.listen(this.config.port, () => {
      console.log("server listen to port:", this.config.port);
    });
  }
}

export default App;
