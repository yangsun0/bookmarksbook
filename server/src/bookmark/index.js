import type { $Request, $Response } from "express";

const express = require("express");

const router: express.Router<$Request, $Response> = express.Router();

const bookmarks = [
  {
    id: "id",
    name: "google a",
  },
];

router.get("/", (req: $Request, res: $Response) => {
  res.send(bookmarks);
});

module.exports = router;
