import request from "supertest";
import app from "./app";
import setupMongoMemory from "./config/testSetup/setupMongoMemoryTest";
import baseUrl from "./tests/config";

const api = request(app);
setupMongoMemory();

describe("Test my app server", () => {
  it("should return status code 200", async () => {
    const res = await api.get(`${baseUrl}/ping`);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("pong");
  });
});
