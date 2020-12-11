import request = require("supertest");
import supertest from "supertest";
import App from "./app";
import { reloadConfig } from "./config";

jest.mock("fs");
jest.mock("jsonwebtoken");
jest.mock("google-auth-library");

let req: supertest.SuperTest<supertest.Test>;

beforeEach(async () => {
  process.env.NODE_ENV = "test";
  process.env.PORT = "3000";
  process.env.GOOGLE_API_CLIENT_ID = "test";
  process.env.AUTH_PRIVATE_KEY_FILE = "valid_path";
  process.env.AUTH_PUBLIC_KEY_FILE = "valid_path";
  process.env.RATE_LIMIT_MAX_PER_MINUTE = "90";
  await setup();
});

async function setup() {
  const app = new App();
  const expressApp = await app.create();
  req = request(expressApp);
}

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
    .set("Cookie", "access_token=valid_access_token");
}

test("sign in failed.", async () => {
  const url = "/api/signin";
  await post(url, {}).expect(401);
  await post(url, { idToken: "invalid_id_token" }).expect(401);
});

test("sign in succeeded.", async () => {
  const url = "/api/signin";
  const res = await post(url, { idToken: "valid_id_token" }).expect(200);
});

test("unauthorized request failed.", async () => {
  await req.get("/api/bookmarks").expect(401);
});

test("authorized request succeeded.", async () => {
  const res = await get("/api/bookmarks").expect(200);
  expect(res.body["bookmarks"]).toBeTruthy();
});

test("request exceeds rate limit", async () => {
  process.env.RATE_LIMIT_MAX_PER_MINUTE = "1";
  reloadConfig();
  await setup();
  await get("/api/bookmarks").expect(200);
  await get("/api/bookmarks").expect(429);
});
