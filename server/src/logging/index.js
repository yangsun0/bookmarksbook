import type { $Request, $Response, NextFunction } from "express";

function logger(req: $Request, res: $Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.log(req.method, req.path);
  next();
}

module.exports = logger;
