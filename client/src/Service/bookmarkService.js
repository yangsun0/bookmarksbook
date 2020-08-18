import axios from "axios";
import type { Axios } from "axios";

export type BookmarkData = {
  id: string,
  name: string,
  url: string,
  iconUrl: string,
  groupId: string,
  order: number,
};

export type GroupData = {
  id: string,
  name: string,
  column: number,
  order: number,
};

export type BookmarkGroupsData = {
  bookmarks: Array<BookmarkData>,
  groups: Array<GroupData>,
};

export default class BookmarkService {
  client: Axios;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  async getBookmarkGroups(): Promise<BookmarkGroupsData> {
    const response = await this.client.get("/bookmarkGroups");
    return response.data;
  }

  updateBookmark(bookmarkData: BookmarkData) {}

  newBookmark(bookmarkData: BookmarkData) {}
}
