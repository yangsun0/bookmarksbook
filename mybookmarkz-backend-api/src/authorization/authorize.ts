import express = require("express");
import Auth from "../auth";

const auth = new Auth();

function authorize(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  let isSuccess = false;
  try {
    const cookies = req.cookies as Record<string, string>;
    const token = cookies[Auth.cookieName];
    if (token) {
      req.user = auth.authorize(token);
      isSuccess = true;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (isSuccess) {
    next();
  } else {
    res.status(401).end();
  }
}

export default authorize;
