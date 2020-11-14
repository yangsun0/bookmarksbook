import * as yup from "yup";
import Auth from "../auth";
import CookieStore from "../cookieStore";
import express = require("express");

interface SignInBody {
  idToken: string;
}

const signInBodySchema = yup.object().shape({
  idToken: yup.string().required(),
});

class SignIn {
  private readonly auth = new Auth();

  public async authenticate(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const body = req.body as SignInBody;
      await signInBodySchema.validate(body);
      const access_token = await this.auth.signIn(body.idToken);
      const cookieStore = new CookieStore(req, res);
      cookieStore.accessToken = access_token;
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
