import request = require("supertest");
import App from "./app";
import { reloadConfig } from "./config";

jest.mock("fs");
jest.mock("jsonwebtoken");
jest.mock("google-auth-library");

beforeEach(async () => {
  process.env.NODE_ENV = "test";
  process.env.PORT = "3000";
  process.env.GOOGLE_API_CLIENT_ID = "test";
  process.env.AUTH_PRIVATE_KEY_FILE = "valid_path";
  process.env.AUTH_PUBLIC_KEY_FILE = "valid_path";
  process.env.RATE_LIMIT_MAX_PER_MINUTE = "90";
});

async function setup() {
  const app = new App();
  const expressApp = await app.create();
}

test("PORT is undefined", async () => {
  await expect(async () => {
    delete process.env.PORT;
    reloadConfig();
    await setup();
  }).rejects.toThrow("PORT");
});

test("PORT is invalid integer", async () => {
  await expect(async () => {
    process.env.PORT = "abc";
    reloadConfig();
    await setup();
  }).rejects.toThrow("PORT");
});

test("GOOGLE_API_CLIENT_ID is undefined", async () => {
  await expect(async () => {
    delete process.env.GOOGLE_API_CLIENT_ID;
    reloadConfig();
    await setup();
  }).rejects.toThrow("GOOGLE_API_CLIENT_ID");
});

test("RATE_LIMIT_MAX_PER_MINUTE is undefined", async () => {
  await expect(async () => {
    delete process.env.RATE_LIMIT_MAX_PER_MINUTE;
    reloadConfig();
    await setup();
  }).rejects.toThrow("RATE_LIMIT_MAX_PER_MINUTE");
});

test("RATE_LIMIT_MAX_PER_MINUTE is invalid integer", async () => {
  await expect(async () => {
    process.env.RATE_LIMIT_MAX_PER_MINUTE = "abc";
    reloadConfig();
    await setup();
  }).rejects.toThrow("RATE_LIMIT_MAX_PER_MINUTE");
});

test("AUTH_PRIVATE_KEY_FILE is invalid file path", async () => {
  await expect(async () => {
    process.env.AUTH_PRIVATE_KEY_FILE = "invalid_path";
    reloadConfig();
    await setup();
  }).rejects.toThrow("invalid path.");
});

test("AUTH_PUBLIC_KEY_FILE is invalid file path", async () => {
  await expect(async () => {
    process.env.AUTH_PUBLIC_KEY_FILE = "invalid_path";
    reloadConfig();
    await setup();
  }).rejects.toThrow("invalid path.");
});
