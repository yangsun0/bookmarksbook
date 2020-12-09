import express = require("express");
import SignIn from "./signIn";

const signIn = new SignIn();
const signInRouter = express.Router();

signInRouter.post("/", async (req, res) => {
  await signIn.authenticate(req, res);
});

export default signInRouter;
