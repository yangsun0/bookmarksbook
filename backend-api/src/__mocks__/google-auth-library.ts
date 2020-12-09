const getUserIdMock = jest.fn().mockImplementation(() => {
  return "userId";
});

const verifyIdTokenMock = jest.fn().mockImplementation((options) => {
  if (options.idToken === "valid_id_token") {
    return {
      getUserId: getUserIdMock,
    };
  } else {
    throw new Error("invalid id token.");
  }
});

const OAuth2ClientMock = jest.fn().mockImplementation(() => {
  return {
    verifyIdToken: verifyIdTokenMock,
  };
});

export { OAuth2ClientMock as OAuth2Client };
