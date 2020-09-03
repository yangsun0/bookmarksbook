import { action, computed, observable, runInAction } from "mobx";
import type { DropDownOption } from "../Form/Control/Dropdown";
import GroupBody from "../Service/Data/GroupBody";
import AppStore from "./AppStore";
import { formToStore, storeToBody, storeToForm } from "./dataTransfer";
import Group from "./Group";

interface IGroupFormValues {
  name: string;
  column: string;
  order: string;
}

class GroupFormValues implements IGroupFormValues {
  name: string;
  column: string;
  order: string;
}

class GroupFormStore {
  appStore: AppStore;
  groupId: string = "";
  group: Group = new Group();
  column: string = "1";

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

  toGroupFormValues() {
    const formValues = new GroupFormValues();
    storeToForm(this.group, formValues);
    return formValues;
  }

  shouldResetOrder(orderString: string) {
    const order = parseInt(orderString);
    return order > this.orderOptionsCount;
  }

  @action init(id?: string) {
    this.groupId = id ? id : "";
    if (this.groupId) {
      this.group = this.appStore.findGroup(this.groupId);
    } else {
      this.createGroup();
    }

    this.column = this.group.column.toString();
    this.calculateOrderOptionCount();
  }

  createGroup() {
    this.group = new Group();
    this.group.column = 1;
    this.group.order = this.appStore.groups.length + 1;
    this.group.store = this.appStore;
  }

  @action changeColumn(column: string) {
    if (column === this.column) {
      return;
    }

    this.column = column;
    this.calculateOrderOptionCount();
  }

  @action calculateOrderOptionCount() {
    let count =
      this.column === "1"
        ? this.appStore.leftGroups.length
        : this.appStore.rightGroups.length;
    if (this.column !== this.group.column.toString() || !this.groupId) {
      count += 1;
    }

    this.orderOptionsCount = count;
  }

  @action async save(groupFormValues: IGroupFormValues) {
    formToStore(groupFormValues, this.group);
    const groupBody = new GroupBody();
    storeToBody(this.group, groupBody);
    if (this.groupId) {
      await this.updateGroup();
    } else {
      await this.newGroup();
    }
  }

  async newGroup() {
    const groupBody = new GroupBody();
    storeToBody(this.group, groupBody);
    const newGroup = await this.appStore.bookmarkService.new(groupBody);
    runInAction(() => {
      this.group.id = newGroup.id.toString();
      this.appStore.groups.push(this.group);
    });
  }

  async updateGroup() {
    const groupBody = new GroupBody();
    storeToBody(this.group, groupBody);
    await this.appStore.bookmarkService.update(this.groupId, groupBody);
  }
}

export default GroupFormStore;
export type { IGroupFormValues };
