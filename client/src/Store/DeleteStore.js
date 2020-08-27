import { action, observable, runInAction } from "mobx";
import BookmarkBody from "../Service/Data/BookmarkBody";
import GroupBody from "../Service/Data/GroupBody";
import AppStore from "./AppStore";
import Bookmark from "./Bookmark";
import Group from "./Group";
import Status from "./Status";
import type { StatusType } from "./Status";

class DeleteStore {
  appStore: AppStore;
  id: string;
  itemType: string;
  targetClass: Function;
  status: StatusType;

  @observable name: string;
  @observable isModalShown: boolean = false;
  @observable targetKey: string;

  @action openModal(targetClass: Function, id: string) {
    if (this.status === Status.pending) {
      return;
    }

    this.id = id;
    this.targetClass = targetClass;
    if (this.targetClass === Bookmark) {
      this.name = this.appStore.findBookmark(this.id).name;
    } else if (this.targetClass === Group) {
      this.name = this.appStore.findGroup(this.id).name;
    } else {
      throw Error("Unknown class: " + this.targetClass.name);
    }

    this.targetKey = this.targetClass.name.toLowerCase();
    this.isModalShown = true;
  }

  @action closeModal() {
    this.isModalShown = false;
    if (this.status === Status.none) {
      this.reset();
    }
  }

  @action reset() {
    this.id = "";
    this.name = "";
    this.itemType = "";
  }

  @action async delete() {
    this.isModalShown = false;
    let bodyClass;
    if (this.targetClass === Bookmark) {
      bodyClass = BookmarkBody;
      const index = this.appStore.bookmarks.findIndex(
        (bookmark) => bookmark.id === this.id
      );
      this.appStore.bookmarks.splice(index, 1);
    } else {
      bodyClass = GroupBody;
      const index = this.appStore.groups.findIndex(
        (group) => group.id === this.id
      );
      this.appStore.groups.splice(index, 1);
    }

    await this.appStore.bookmarkService.delete(bodyClass, this.id);
    runInAction(() => {
      this.status = Status.done;
    });

    this.reset();
  }
}

export default DeleteStore;
