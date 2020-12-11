const readFileMock = jest.fn().mockImplementation((path, callback) => {
  if (path === "valid_path") {
    callback(null, "file_content");
  } else {
    callback(new Error("invalid path."));
  }
});

export { readFileMock as readFile };
