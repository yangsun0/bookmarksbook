import request = require("supertest");
import supertest from "supertest";
import App from "./app";

jest.mock("jsonwebtoken");
jest.mock("./auth/googleAuth");

let req: supertest.SuperTest<supertest.Test>;

beforeEach(() => {
  const app = new App();
  const expressApp = app.create();
  req = request(expressApp);
});

function post(url: string, body: object): supertest.Test {
  return req
    .post(url)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send(body);
}

function get(url: string): supertest.Test {
  return req
    .get(url)
    .set("Accept", "application/json")
    .set("Cookie", "access_token=valid_token");
}

test("sign in failed.", async () => {
  const url = "/signin";
  await post(url, {}).expect(401);
  await post(url, { idToken: "invalid_token" }).expect(401);
});

test("sign in succeeded.", async () => {
  const url = "/signin";
  const res = await post(url, { idToken: "valid_token" }).expect(200);
});

test("unauthorized request failed.", async () => {
  await req.get("/bookmarks").expect(401);
});

test("authorized request succeeded.", async () => {
  const res = await get("/bookmarks").expect(200);
  expect(res.body["bookmarks"]).toBeTruthy();
});
