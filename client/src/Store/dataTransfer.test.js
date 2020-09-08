import { observable } from "mobx";
import {
  entityToStore,
  formToStore,
  storeToBody,
  storeToForm,
  transferable,
} from "./dataTransfer";

class Store {
  id: string;
  @observable @transferable stringProp: string = "";
  @observable @transferable numberProp: number = 0;
}

class Body {
  stringProp: string;
  numberProp: number;
}

class Entity {
  id: string;
  stringProp: string;
  numberProp: number;
}

class Form {
  stringProp: string;
  numberProp: string;
}

test("transfer entity to store", () => {
  const entity = new Entity();
  const store = new Store();
  entity.id = "id";
  entity.stringProp = "a string";
  entity.numberProp = 1;
  entityToStore(entity, store);
  expect(store.id).toBe(entity.id);
  expect(store.stringProp).toBe(entity.stringProp);
  expect(store.numberProp).toBe(entity.numberProp);
});

test("transfer store to body", () => {
  const store = new Store();
  const body = new Body();
  store.stringProp = "a string";
  store.numberProp = 1;
  storeToBody(store, body);
  expect(body.stringProp).toBe(store.stringProp);
  expect(body.numberProp).toBe(store.numberProp);
});

test("transfer store to form", () => {
  const store = new Store();
  const form = new Form();
  store.stringProp = "a string";
  store.numberProp = 1;
  storeToForm(store, form);
  expect(form.stringProp).toBe(store.stringProp);
  expect(typeof form.numberProp).toBe("string");
  expect(form.numberProp).toBe(store.numberProp.toString());
});

test("transfer form to store", () => {
  const form = new Form();
  const store = new Store();
  form.stringProp = "a string";
  form.numberProp = "1";
  formToStore(form, store);
  expect(store.stringProp).toBe(form.stringProp);
  expect(typeof store.numberProp).toBe("number");
  expect(store.numberProp).toBe(parseInt(form.numberProp));
});
