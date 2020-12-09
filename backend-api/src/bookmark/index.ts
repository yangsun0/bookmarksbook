import express = require("express");

const router = express.Router();
const bookmarks = [
  {
    id: "id",
    name: "google a",
  },
];

router.get("/", (req: express.Request, res: express.Response) => {
  const response = {
    userId: req.user.id,
    bookmarks: bookmarks,
  };
  res.send(response);
});

export default router;
