const verifyMock = jest
  .fn()
  .mockImplementation((token, secret, options, callback) => {
    if (token === "valid_access_token") {
      callback(null, { sub: "userId" });
    } else {
      callback(new Error("invalid access token."));
    }
  });

const signMock = jest
  .fn()
  .mockImplementation((payload, secret, options, callback) => {
    callback(null, "valid_access_token");
  });

export { verifyMock as verify, signMock as sign };
