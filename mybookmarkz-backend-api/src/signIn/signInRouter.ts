import express = require("express");
import SignInRequestHandler from "./signInRequestHandler";

const requestHandler = new SignInRequestHandler();
const signInRouter = express.Router();

signInRouter.post("/", async (req, res) => {
  await requestHandler.signIn(req, res);
});

export default signInRouter;
