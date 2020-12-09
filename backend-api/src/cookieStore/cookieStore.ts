import express = require("express");
import CookieError from "./cookieError";
import CookieNames from "./cookieNames";

class CookieStore {
  private cookies: Record<string, string | undefined>;
  private res: express.Response;

  constructor(req: express.Request, res: express.Response) {
    this.cookies = req.cookies as Record<string, string>;
    this.res = res;
  }

  public get accessToken(): string {
    const token = this.cookies[CookieNames.AccessToken];
    if (token === undefined) {
      throw new CookieError(CookieNames.AccessToken);
    }

    return token;
  }

  public set accessToken(value: string) {
    this.res.cookie(CookieNames.AccessToken, value, {
      httpOnly: true,
      // todo after enable https
      // secure: true,
      // sameSite: "strict",
    });
  }
}

export default CookieStore;
