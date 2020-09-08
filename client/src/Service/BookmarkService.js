import axios from "axios";
import type { Axios } from "axios";
import PathResolver from "./PathResolver";

class BookmarkService {
  client: Axios;
  pathResolver: PathResolver = new PathResolver();

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  async new(data: Object): Promise<Object> {
    const path = this.pathResolver.getCollectionPathByInstance(data);
    const response = await this.client.post(path, data);
    return response.data;
  }

  async update(id: string, data: Object) {
    const path = this.pathResolver.getSinglePathByInstance(data, id);
    await this.client.put(path, data);
  }

  async delete(classCotr: Function, id: string) {
    const path = this.pathResolver.getSinglePathByClass(classCotr, id);
    await this.client.delete(path);
  }

  async getAll(classCotr: Function): Promise<Array<Object>> {
    const path = this.pathResolver.getCollectionPathByClass(classCotr);
    const response = await this.client.get(path);
    return response.data;
  }
}

export default BookmarkService;
