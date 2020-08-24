import { action, computed, observable } from "mobx";
import type { DropDownOption } from "../Form/Control/Dropdown";
import AppStore from "./AppStore";
import Bookmark, { BookmarkBody } from "./Bookmark";
import { formToStore, storeToBody, storeToForm } from "./copyUtility";

interface IBookmarkFormValues {
  name: string;
  url: string;
  groupId: string;
  order: string;
}

class BookmarkFormValues implements IBookmarkFormValues {
  name: string;
  url: string;
  groupId: string;
  order: string;
}

class BookmarkFormStore {
  appStore: AppStore;
  bookmarkId: string;
  bookmark: Bookmark;
  groupId: string;

  @observable isModalShown: boolean = false;
  @observable orderOptionsCount: number = 1;

  @computed get orderOptions(): Array<DropDownOption> {
    const options = [];
    for (let i = 1; i <= this.orderOptionsCount; i++) {
      options.push({
        label: i.toString(),
        value: i.toString(),
      });
    }
    return options;
  }

  toBookmarkFormValues(): IBookmarkFormValues {
    const values = new BookmarkFormValues();
    storeToForm(this.bookmark, values);
    return values;
  }

  toGroupOptions(): Array<DropDownOption> {
    const options = this.appStore.groups.map((group) => {
      return { label: group.name, value: group.id };
    });
    return options;
  }

  shouldResetOrder(orderString: string) {
    const order = parseInt(orderString);
    return order > this.orderOptionsCount;
  }

  @action openModal(id?: string) {
    this.bookmarkId = id ? id : "";
    if (this.bookmarkId) {
      const result = this.appStore.bookmarks.find(
        (bookmark) => bookmark.id === this.bookmarkId
      );
      if (!result) {
        throw Error("bookmarkId not found. id: " + this.bookmarkId);
      }

      this.bookmark = result;
    } else {
      this.bookmark = new Bookmark();
      this.bookmark.groupId = this.appStore.firstGroup.id;
      this.bookmark.store = this.appStore;
    }

    this.groupId = "";
    this.changeGroup(this.bookmark.groupId);
    this.isModalShown = true;
  }

  @action closeModal() {
    this.bookmarkId = "";
    this.groupId = "";
    this.isModalShown = false;
  }

  @action changeGroup(groupId: string) {
    if (groupId === this.groupId) {
      return;
    }

    this.groupId = groupId;
    const group = this.appStore.findGroup(this.groupId);
    let count = group.bookmarks.length;
    if (this.groupId !== this.bookmark.groupId) {
      count += 1;
    }

    this.orderOptionsCount = count;
  }

  @action save(newBookmark: IBookmarkFormValues) {
    formToStore(newBookmark, this.bookmark);
    if (this.bookmarkId) {
      const data = new BookmarkBody();
      storeToBody(this.bookmark, data);
      this.appStore.bookmarkService.updateBookmark(this.bookmarkId, data);
    } else {
      this.appStore.bookmarkService.newBookmark(newBookmark);
    }
  }
}

export default BookmarkFormStore;
export { BookmarkFormValues };
export type { IBookmarkFormValues };
