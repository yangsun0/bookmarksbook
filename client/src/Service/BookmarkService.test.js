import axios from "axios";
import BookmarkService from "./BookmarkService";
import PathResolver from "./PathResolver";

jest.mock("axios");
jest.mock("./PathResolver");

beforeEach(() => {
  axios.mockClear();
  PathResolver.mockClear();
  axios.create.mockImplementation((config) => axios);
});

class TestObj {
  name: string;
}

test("new", async () => {
  const response = {
    data: new TestObj(),
  };
  axios.post.mockImplementation((path, data) => response);
  const bookmarkService = new BookmarkService();
  const result = await bookmarkService.new(new TestObj());
  expect(axios.post).toHaveBeenCalled();
  expect(result).toBe(response.data);
});

test("update", async () => {
  axios.put.mockImplementation((path, data) => {});
  const bookmarkService = new BookmarkService();
  await bookmarkService.update(new TestObj(), "id");
  expect(axios.put).toHaveBeenCalled();
});

test("delete", async () => {
  axios.delete.mockImplementation((path) => {});
  const bookmarkService = new BookmarkService();
  await bookmarkService.delete(TestObj, "id");
  expect(axios.delete).toHaveBeenCalled();
});

test("get all", async () => {
  const response = {
    data: new TestObj(),
  };
  axios.get.mockImplementation((path) => response);
  const bookmarkService = new BookmarkService();
  const result = await bookmarkService.getAll(TestObj);
  expect(axios.get).toHaveBeenCalled();
  expect(result).toBe(response.data);
});
