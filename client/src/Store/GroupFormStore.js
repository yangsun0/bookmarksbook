import { action, observable } from "mobx";
import AppStore from "./AppStore";
import Group from "./Group";
import type { GroupBody } from "./Group";

type Option = {
  value: string,
  label: string,
};

class GroupFormStore {
  appStore: AppStore;

  @observable isModalShown: boolean = false;
  @observable groupId: string;
  @observable group: Group;
  @observable column: string;
  @observable orderOptions: Array<Option> = [];

  @action openModal(id?: string) {
    this.groupId = id ? id : "";
    let group;
    if (this.groupId) {
      group = this.appStore.groups.find((g) => g.id === this.groupId);
    }
    if (!group) {
      group = new Group();
      group.store = this.appStore;
    }

    this.group = group;
    this.changeColumn(group.column.toString());
    this.isModalShown = true;
  }

  @action closeModal() {
    this.groupId = "";
    this.isModalShown = false;
  }

  @action changeColumn(column: string) {
    this.column = column;
    let count =
      this.column === "1"
        ? this.appStore.leftGroups.length
        : this.appStore.rightGroups.length;
    let isChanged = false;
    if (this.column !== this.group.column.toString()) {
      count += 1;
      isChanged = true;
    }

    console.log("column: " + this.column + ", count: " + count);
    this.populateOptions(count);
    return isChanged;
  }

  @action save(newGroup: GroupBody) {
    if (this.groupId) {
      this.appStore.bookmarkService.updateGroup(this.groupId, newGroup);
    } else {
      this.appStore.bookmarkService.newGroup(newGroup);
    }
  }

  populateOptions(count: number) {
    if (this.orderOptions.length === count) {
      return;
    }
    this.orderOptions = [];
    for (let i = 1; i <= count; i++) {
      this.orderOptions.push({
        label: i.toString(),
        value: i.toString(),
      });
    }
  }
}

export default GroupFormStore;
