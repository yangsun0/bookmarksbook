const { default: Config } = require("../Config");
const { default: GoogleSignInService } = require("./GoogleSignInService");

const loadMock = jest.fn().mockImplementation((name, resolve) => {
  resolve();
});
const initMock = jest.fn().mockResolvedValue();

beforeEach(() => {
  jest.useFakeTimers();
  loadMock.mockClear();
  initMock.mockClear();
  window.gapi = undefined;
});

test("initial state", () => {
  const googleService = new GoogleSignInService();
  const props = Object.getOwnPropertyNames(googleService);
  props.forEach((prop) => {
    expect(googleService[prop]).not.toBeUndefined();
  });
});

test("init without delay", async () => {
  window.gapi = {
    load: loadMock,
    auth2: {
      init: initMock,
    },
  };
  const googleService = new GoogleSignInService();
  await googleService.init();
  expect(setTimeout).toHaveBeenCalledTimes(0);
  expect(loadMock).toBeCalledTimes(1);
  expect(initMock).toBeCalledTimes(1);
});

test("init with delay", () => {
  const googleService = new GoogleSignInService();
  googleService.init().then(() => {
    expect(loadMock).toBeCalledTimes(1);
    expect(initMock).toBeCalledTimes(1);
  });

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(loadMock).toBeCalledTimes(0);
  window.gapi = {
    load: loadMock,
    auth2: {
      init: initMock,
    },
  };
  jest.advanceTimersByTime(Config.googleApiCheckInterval);
});

test("init timeout", () => {
  const googleService = new GoogleSignInService();
  googleService.init().then(() => {
    expect(loadMock).toBeCalledTimes(0);
    expect(initMock).toBeCalledTimes(0);
  });

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(loadMock).toBeCalledTimes(0);
  window.gapi = {
    load: loadMock,
    auth2: {
      init: initMock,
    },
  };
  jest.advanceTimersByTime(Config.googleApiCheckTimeout);
});
