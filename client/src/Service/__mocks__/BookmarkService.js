import BookmarkBody from "../Data/BookmarkBody";
import GroupBody from "../Data/GroupBody";
import sampleData from "./data.json";

export const mockGetAll = jest.fn().mockImplementation((cls) => {
  if (cls === BookmarkBody) {
    return sampleData.bookmarks;
  } else if (cls === GroupBody) {
    return sampleData.groups;
  }

  return [];
});

export const mockNew = jest.fn().mockImplementation(() => {
  return { id: "new_id" };
});

export const mockUpdate = jest.fn();
export const mockDelete = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return {
    getAll: mockGetAll,
    new: mockNew,
    update: mockUpdate,
    delete: mockDelete,
  };
});

export default mock;
