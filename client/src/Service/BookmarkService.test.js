import axios from "axios";
import BookmarkService from "./BookmarkService";
import PathResolver from "./PathResolver";

jest.mock("axios");
jest.mock("./PathResolver");

beforeEach(() => {
  axios.mockClear();
  axios.post.mockClear();
  axios.put.mockClear();
  axios.delete.mockClear();
  axios.get.mockClear();
  axios.create.mockClear();
  PathResolver.mockClear();
  axios.create.mockImplementation((config) => axios);
});

class TestObj {
  name: string;
}

test("sign in and out", async () => {
  const response = {
    data: {
      access_token: "access_token_data",
    },
  };
  axios.post.mockImplementation((path, data) => response);
  const bookmarkService = new BookmarkService();
  expect(axios.create).toHaveBeenCalledTimes(1);
  let arg = axios.create.mock.calls[0][0];
  expect(arg.headers).not.toBeTruthy();

  axios.create.mockClear();
  await bookmarkService.signIn("id_token");
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.create).toHaveBeenCalledTimes(1);
  arg = axios.create.mock.calls[0][0];
  expect(arg.headers).toBeTruthy();
  expect(arg.headers.Authorization).toBeTruthy();
  expect(bookmarkService.isSignedIn).toBeTruthy();

  axios.create.mockClear();
  await bookmarkService.signOut();
  expect(axios.create).toHaveBeenCalledTimes(1);
  arg = axios.create.mock.calls[0][0];
  expect(arg.headers).not.toBeTruthy();
  expect(bookmarkService.isSignedIn).not.toBeTruthy();
});

test("new", async () => {
  const response = {
    data: new TestObj(),
  };
  axios.post.mockImplementation((path, data) => response);
  const bookmarkService = new BookmarkService();
  const result = await bookmarkService.new(new TestObj());
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(result).toBe(response.data);
});

test("update", async () => {
  axios.put.mockImplementation((path, data) => {});
  const bookmarkService = new BookmarkService();
  await bookmarkService.update(new TestObj(), "id");
  expect(axios.put).toHaveBeenCalledTimes(1);
});

test("delete", async () => {
  axios.delete.mockImplementation((path) => {});
  const bookmarkService = new BookmarkService();
  await bookmarkService.delete(TestObj, "id");
  expect(axios.delete).toHaveBeenCalledTimes(1);
});

test("get all", async () => {
  const response = {
    data: new TestObj(),
  };
  axios.get.mockImplementation((path) => response);
  const bookmarkService = new BookmarkService();
  const result = await bookmarkService.getAll(TestObj);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(result).toBe(response.data);
});
