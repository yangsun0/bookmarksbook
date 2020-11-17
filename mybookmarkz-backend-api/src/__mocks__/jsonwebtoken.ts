const verifyMock = jest.fn().mockImplementation((token, secret, option?) => {
  if (token === "valid_access_token") {
    return { sub: "userId" };
  }
  throw new Error("invalid access token.");
});

const signMock = jest.fn().mockImplementation((payload, secret, options) => {
  return "valid_access_token";
});

export { verifyMock as verify, signMock as sign };
