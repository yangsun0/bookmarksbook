import express = require("express");
import Auth from "../auth";
import CookieStore from "../cookieStore";

const auth = new Auth();

async function authorize(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  try {
    const cookeStore = new CookieStore(req, res);
    req.user = await auth.authorize(cookeStore.accessToken);
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    res.status(401).end();
  }
}

export default authorize;
