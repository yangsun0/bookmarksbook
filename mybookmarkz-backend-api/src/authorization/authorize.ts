import express = require("express");
import Auth from "../auth";
import CookieStore from "../cookieStore";

const auth = new Auth();

function authorize(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  try {
    const cookeStore = new CookieStore(req, res);
    req.user = auth.authorize(cookeStore.accessToken);
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    res.status(401).end();
  }
}

export default authorize;
