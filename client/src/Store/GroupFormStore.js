import { action, computed, observable, runInAction } from "mobx";
import type { DropDownOption } from "../Form/Control/Dropdown";
import GroupBody from "../Service/Data/GroupBody";
import AppStore from "./AppStore";
import { formToStore, storeToBody, storeToForm } from "./copyUtility";
import Group from "./Group";
import Status from "./Status";
import type { StatusType } from "./Status";

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
  groupId: string;
  group: Group;
  column: string;
  status: StatusType = Status.none;

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

  toGroupFormValues() {
    const formValues = new GroupFormValues();
    storeToForm(this.group, formValues);
    return formValues;
  }

  shouldResetOrder(orderString: string) {
    const order = parseInt(orderString);
    return order > this.orderOptionsCount;
  }

  @action openModal(id?: string) {
    if (this.status === Status.pending) {
      return;
    }

    this.status = Status.none;
    this.groupId = id ? id : "";
    if (this.groupId) {
      this.group = this.appStore.findGroup(this.groupId);
    } else {
      this.createGroup();
    }

    this.column = this.group.column.toString();
    this.calculateOrderOptionCount();
    this.isModalShown = true;
  }

  createGroup() {
    this.group = new Group();
    this.group.column = 1;
    this.group.order = this.appStore.groups.length + 1;
    this.group.store = this.appStore;
  }

  @action closeModal() {
    this.isModalShown = false;
    if (this.status === Status.none) {
      this.reset();
    }
  }

  @action reset() {
    this.groupId = "";
    this.group = new Group();
    this.column = "";
  }

  @action changeColumn(column: string) {
    if (column === this.column) {
      return;
    }

    this.column = column;
    this.calculateOrderOptionCount();
  }

  calculateOrderOptionCount() {
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
    this.status = Status.pending;
    formToStore(groupFormValues, this.group);
    const groupBody = new GroupBody();
    storeToBody(this.group, groupBody);
    if (this.groupId) {
      await this.updateGroup();
    } else {
      await this.newGroup();
    }

    runInAction(() => {
      this.status = Status.done;
      this.reset();
    });
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
