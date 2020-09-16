import type { Axios } from "axios";
import axios from "axios";
import Config from "../Config";
import PathResolver from "./PathResolver";

class BookmarkService {
  client: Axios;
  pathResolver: PathResolver = new PathResolver();
  isSignedIn: boolean = false;

  constructor() {
    this.client = axios.create({
      baseURL: Config.baseUrl,
    });
  }

  async signIn(idToken: string) {
    const path = "/signin";
    const data = {
      token: idToken,
    };
    const response = await this.client.post(path, data);
    const responseData = response.data;
    const accessToken = responseData["access_token"];
    if (accessToken) {
      const token = "Bearer " + accessToken;
      this.client = axios.create({
        baseURL: Config.baseUrl,
        headers: {
          Authorization: token,
        },
      });
      this.isSignedIn = true;
    }
  }

  signOut() {
    this.client = axios.create({
      baseURL: Config.baseUrl,
    });
    this.isSignedIn = false;
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
