import * as yup from "yup";
import Auth from "../auth";
import express = require("express");

interface SignInBody {
  idToken: string;
}

const signInBodySchema = yup.object().shape({
  idToken: yup.string().required(),
});

class SignInRequestHandler {
  private readonly auth = new Auth();

  public async signIn(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const body = req.body as SignInBody;
      await signInBodySchema.validate(body);
      const access_token = await this.auth.signIn(body.idToken);
      res.cookie(Auth.cookieName, access_token, {
        httpOnly: true,
        // secure: true,
      });
      res.end();
    } catch (error) {
      res.status(401).end();
    }
  }
}

export default SignInRequestHandler;
