import AppStore from "./AppStore";
import Group from "./Group";

test("initial state", () => {
  const group = new Group();
  group.store = new AppStore();
  const props = Object.getOwnPropertyNames(group);
  props.forEach((prop) => {
    expect(group[prop]).not.toBeUndefined();
  });
});
