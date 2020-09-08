const propertySymbol = Symbol();
const numberType = "number";
const idProp = "id";

function transferable(target: any, key: string) {
  if (!target.hasOwnProperty(propertySymbol)) {
    Object.defineProperty(target, propertySymbol, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: [],
    });
  }

  target[propertySymbol].push(key);
}

function getTransferableProps(object: Object) {
  const prototype = Object.getPrototypeOf(object);
  if (prototype.hasOwnProperty(propertySymbol)) {
    return prototype[propertySymbol];
  } else {
    return [];
  }
}

function entityToStore(entity: Object, store: Object) {
  if (entity[idProp]) {
    if (typeof entity[idProp] === numberType) {
      store[idProp] = entity[idProp].toString();
    } else {
      store[idProp] = entity[idProp];
    }
  }

  const transferableProps = getTransferableProps(store);
  transferableProps.forEach((prop) => (store[prop] = entity[prop]));
}

function storeToBody(store: Object, body: Object) {
  const transferableProps = getTransferableProps(store);
  transferableProps.forEach((prop) => (body[prop] = store[prop]));
}

function storeToForm(store: Object, form: Object) {
  const transferableProps = getTransferableProps(store);
  transferableProps.forEach((prop) => {
    if (typeof store[prop] === numberType) {
      form[prop] = store[prop].toString();
    } else {
      form[prop] = store[prop];
    }
  });
}

function formToStore(form: Object, store: Object) {
  const transferableProps = getTransferableProps(store);
  transferableProps.forEach((prop) => {
    if (typeof store[prop] === numberType) {
      store[prop] = parseInt(form[prop]);
    } else {
      store[prop] = form[prop];
    }
  });
}

export { transferable, storeToForm, formToStore, storeToBody, entityToStore };
