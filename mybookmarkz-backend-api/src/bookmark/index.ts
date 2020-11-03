import express = require("express");

const router = express.Router();
const bookmarks = [
  {
    id: "id",
    name: "google a",
  },
];

router.get("/", (req: express.Request, res: express.Response) => {
  res.send(bookmarks);
});

export default router;
