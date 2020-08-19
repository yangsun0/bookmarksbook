import axios from "axios";
import type { Axios } from "axios";

const paths = {
  bookmarks: "/bookmarks",
  groups: "/groups",
};

class BookmarkService {
  client: Axios;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  async getBookmarks(): Promise<Array<Object>> {
    const response = await this.client.get(paths.bookmarks);
    return response.data;
  }

  async getGroups(): Promise<Array<Object>> {
    const response = await this.client.get(paths.groups);
    return response.data;
  }

  getItemPath(path: string, id: string): string {
    return path + "/" + id;
  }

  async updateBookmark(id: string, data: Object) {
    await this.client.put(this.getItemPath(paths.bookmarks, id), data);
  }

  async newBookmark(data: Object) {
    await this.client.post(paths.bookmarks, data);
  }

  async updateGroup(id: string, data: Object) {
    await this.client.put(this.getItemPath(paths.groups, id), data);
  }

  async newGroup(data: Object) {
    await this.client.post(paths.groups, data);
  }
}

export default BookmarkService;
