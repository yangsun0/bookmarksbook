import BookmarkService, {
  signInMock as serviceSignInMock,
  signOutMock as serviceSignOutMock,
} from "../Service/BookmarkService";
import SignInService, {
  isSignedInMock,
  signInMock,
  signOutMock,
} from "../Service/SignInService";
import AppStore from "./AppStore";
import SignInStore from "./SignInStore";

jest.mock("../Service/SignInService");
jest.mock("../Service/BookmarkService");
const appStore = new AppStore();
let store = new SignInStore();
store.appStore = appStore;

beforeEach(() => {
  SignInService.mockClear();
  isSignedInMock.mockClear();
  signInMock.mockClear();
  signOutMock.mockClear();
  BookmarkService.mockClear();
  serviceSignInMock.mockClear();
  serviceSignOutMock.mockClear();
  const appStore = new AppStore();
  store = new SignInStore();
  store.appStore = appStore;
  isSignedInMock.mockReturnValue(false);
});

test("authenticate without sign in", async () => {
  await store.authenticate();
  expect(store.isSignedIn).not.toBeTruthy();
  expect(store.id).toBe("");
  expect(store.name).toBe("");
  expect(store.email).toBe("");
  expect(store.imageUrl).toBe("");
  expect(serviceSignInMock).toHaveBeenCalledTimes(0);
});

test("authenticate with sign in already and sign out", async () => {
  isSignedInMock.mockReturnValue(true);
  await store.authenticate();
  expect(store.isSignedIn).toBeTruthy();
  expect(store.id).toBeTruthy();
  expect(store.name).toBeTruthy();
  expect(store.email).toBeTruthy();
  expect(store.imageUrl).toBeTruthy();
  expect(serviceSignInMock).toHaveBeenCalledTimes(1);

  await store.signOut();
  expect(serviceSignOutMock).toHaveBeenCalledTimes(1);
  expect(store.isSignedIn).not.toBeTruthy();
  expect(store.id).toBe("");
  expect(store.name).toBe("");
  expect(store.email).toBe("");
  expect(store.imageUrl).toBe("");
});

test("sign in and out", async () => {
  await store.authenticate();
  expect(store.isSignedIn).not.toBeTruthy();
  await store.signIn();
  expect(signInMock).toHaveBeenCalledTimes(1);
  expect(store.isSignedIn).toBeTruthy();
  expect(store.id).toBeTruthy();
  expect(store.name).toBeTruthy();
  expect(store.email).toBeTruthy();
  expect(store.imageUrl).toBeTruthy();
  expect(serviceSignInMock).toHaveBeenCalledTimes(1);

  await store.signOut();
  expect(signOutMock).toHaveBeenCalledTimes(1);
  expect(serviceSignOutMock).toHaveBeenCalledTimes(1);
  expect(store.isSignedIn).not.toBeTruthy();
  expect(store.id).toBe("");
  expect(store.name).toBe("");
  expect(store.email).toBe("");
  expect(store.imageUrl).toBe("");
});
