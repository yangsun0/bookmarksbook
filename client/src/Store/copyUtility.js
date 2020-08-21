function preserve(target: any, key: string) {
  const prototype = Object.getPrototypeOf(target);
  if (!prototype.preservedProps) {
    Object.defineProperty(prototype, "preservedProps", {
      value: [],
    });
  }

  prototype.preservedProps.push(key);
}

function copyFrom(target: Object, source: Object) {
  const prototype = Object.getPrototypeOf(target);
  if (!prototype.preservedProps) {
    return;
  }

  prototype.preservedProps.forEach((prop) => (target[prop] = source[prop]));
}

function toData(source: Object): Object {
  const data = {};
  const prototype = Object.getPrototypeOf(source);
  if (prototype.preservedProps) {
    prototype.preservedProps.forEach((prop) => (data[prop] = source[prop]));
  }

  return data;
}

export { preserve, copyFrom, toData };
