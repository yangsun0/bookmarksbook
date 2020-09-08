import PathResolver from "./PathResolver";

class TestObj {}

test("resolve path for class or instance", () => {
  const pathResolver = new PathResolver();
  pathResolver.register(TestObj, "/test_obj_path");
  let path = pathResolver.getCollectionPathByClass(TestObj);
  expect(path).toBe("/test_obj_path");
  path = pathResolver.getSinglePathByClass(TestObj, "id1");
  expect(path).toBe("/test_obj_path/id1");
  path = pathResolver.getCollectionPathByInstance(new TestObj());
  expect(path).toBe("/test_obj_path");
  path = pathResolver.getSinglePathByInstance(new TestObj(), "id1");
  expect(path).toBe("/test_obj_path/id1");
});
