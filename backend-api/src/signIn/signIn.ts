import auth from "../auth";
import CookieStore from "../cookieStore";
import { getSignInBody } from "./singInBody";
import express = require("express");

class SignIn {
  public async authenticate(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const body = await getSignInBody(req);
      const cookieStore = new CookieStore(req, res);
      cookieStore.accessToken = await auth().authenticate(body.idToken);
      res.end();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      res.status(401).end();
    }
  }

  public createRouter(): express.Router {
    const signInRouter = express.Router();
    signInRouter.post("/", async (req, res) => {
      await this.authenticate(req, res);
    });
    return signInRouter;
  }
}

export default SignIn;
