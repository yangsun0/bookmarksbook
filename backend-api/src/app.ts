import cookieParser = require("cookie-parser");
import express = require("express");
import morgan = require("morgan");
import rateLimit = require("express-rate-limit");
import auth from "./auth";
import authorization from "./authorization";
import bookmarks from "./bookmark";
import getConfig from "./config";
import SignIn from "./signIn";

class App {
  public async create(): Promise<express.Application> {
    await auth().init();
    const config = getConfig();
    const expressApp = express();
    const limiter = rateLimit({
      windowMs: 60 * 1000,
      max: config.rateLimitMax,
    });

    if (config.nodeEnv !== "test") {
      // http log
      expressApp.use(morgan(config.httpLogFormat));
    }

    // rate limit
    expressApp.use(limiter);
    // json parser for request body
    expressApp.use(express.json());
    // parser for request cookies
    expressApp.use(cookieParser());
    // sign in router, no authentication for this path
    const signIn = new SignIn();
    expressApp.use("/api/signin", signIn.createRouter());
    // authenticate all the other paths
    expressApp.use(authorization);
    // bookmarks router
    expressApp.use("/api/bookmarks", bookmarks);

    return expressApp;
  }

  public async run(): Promise<void> {
    const expressApp = await this.create();
    const config = getConfig();
    expressApp.listen(config.port, () => {
      console.log("server listen to port:", config.port);
    });
  }
}

export default App;
