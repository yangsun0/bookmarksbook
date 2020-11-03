import express = require("express");

function logger(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  console.log(req.method, req.path);
  next();
}

export default logger;
