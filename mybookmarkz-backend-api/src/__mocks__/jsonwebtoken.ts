import * as jwt from "jsonwebtoken";

type moduleType = {
  verify: typeof jwt.verify;
};

const jsonwebtoken = jest.createMockFromModule("jsonwebtoken") as moduleType;

function verify(token, secret, option?) {
  return { sub: "userId" };
}

jsonwebtoken.verify = verify;

module.exports = jsonwebtoken;
