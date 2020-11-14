import * as yup from "yup";
import express = require("express");

interface SignInBody {
  idToken: string;
}

const signInBodySchema = yup.object().shape({
  idToken: yup.string().required(),
});

async function getSignInBody(req: express.Request): Promise<SignInBody> {
  const body = req.body as SignInBody;
  await signInBodySchema.validate(body);
  return body;
}

export { SignInBody, getSignInBody };
