import Auth from "../auth";
import CookieStore from "../cookieStore";
import { getSignInBody } from "./singInBody";
import express = require("express");

class SignIn {
  private readonly auth = new Auth();

  public async authenticate(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const body = await getSignInBody(req);
      const cookieStore = new CookieStore(req, res);
      cookieStore.accessToken = await this.auth.authenticate(body.idToken);
      res.end();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      res.status(401).end();
    }
  }
}

export default SignIn;
