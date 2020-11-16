export const authenticateMock = jest
  .fn()
  .mockImplementation((idToken: string) => {
    if (idToken === "valid_token") {
      return "userId";
    } else {
      throw new Error("invalid id token");
    }
  });

const mock = jest.fn().mockImplementation(() => {
  return {
    authenticate: authenticateMock,
  };
});

export default mock;
