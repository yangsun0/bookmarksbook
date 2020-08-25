import BookmarkBody from "./Data/BookmarkBody";
import GroupBody from "./Data/GroupBody";

const paths = {
  bookmarks: "/bookmarks",
  groups: "/groups",
};

class PathResolver {
  classNameToPathMap: Map<string, string> = new Map();

  constructor() {
    this.classNameToPathMap.set(BookmarkBody.name, paths.bookmarks);
    this.classNameToPathMap.set(GroupBody.name, paths.groups);
  }

  getCollectionPathByClass(classCotr: Function): string {
    const path = this.classNameToPathMap.get(classCotr.name);
    if (!path) {
      throw Error("Unknown class: " + classCotr.name);
    }

    return path;
  }

  getCollectionPathByInstance(instance: Object): string {
    return this.getCollectionPathByClass(instance.constructor);
  }

  getSinglePathByInstance(object: Object, id: string): string {
    let path = this.getCollectionPathByInstance(object);
    path = path + "/" + id;

    return path;
  }

  getSinglePathByClass(classCotr: Function, id: string): string {
    let path = this.getCollectionPathByClass(classCotr);
    path = path + "/" + id;

    return path;
  }
}

export default PathResolver;
