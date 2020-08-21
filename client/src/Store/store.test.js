import Bookmark from "./Bookmark";
import { toData } from "./copyUtility";

test("copy from ", () => {
  const bookmark = new Bookmark();
  bookmark.id = "id 1";
  bookmark.name = "bookmark 1";
  const data = toData(bookmark);
  expect(data.name).toBe(bookmark.name);
  expect(data.id).toBe(undefined);
});
