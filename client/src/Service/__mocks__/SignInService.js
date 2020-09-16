export const isSignedInMock = jest.fn().mockReturnValue(false);

export const initMock = jest.fn();
export const signInMock = jest.fn().mockReturnValue({
  id: "id",
  name: "name",
  email: "email",
  imageUrl: "imageUrl",
});
export const signOutMock = jest.fn();

export const getUserMock = jest.fn().mockReturnValue({
  id: "id",
  name: "name",
  email: "email",
  imageUrl: "imageUrl",
});

export const getIdTokenMock = jest.fn().mockReturnValue("id_token");

const mock = jest.fn().mockImplementation(() => {
  return {
    init: initMock,
    isSignedIn: isSignedInMock,
    getUser: getUserMock,
    getIdToken: getIdTokenMock,
    signIn: signInMock,
    signOut: signOutMock,
  };
});

export default mock;
