import mongoose from "mongoose";
import request from "supertest";
import app from "../app"; // Replace with your app's entry point
import User from "../models/User";
import { users } from "./fixtures/data.json";
import baseUrl from "./config";

const api = request(app);

describe("Auth Controller", () => {
  let userToken: string;
  let userId: string;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("User Registration", () => {
    it("should register a new user", async () => {
      const referralCode = users[0].referralCode;
      const res = await api
        .post(`${baseUrl}/user/register?ref=${referralCode}`)
        .send({
          name: users[0].name,
          email: users[0].email,
          password: users[0].password,
          passwordConfirm: users[0].passwordConfirm,
          role: users[0].role,
          referralCode: users[0].referralCode,
          referredBy: users[0].referredBy,
        });

      expect(res.status).toEqual(200);
      expect(res.body.data.user.email).toBe(users[0].email);
      userId = res.body.data.user._id;
    });
  });

  describe("User Login", () => {
    beforeEach(async () => {
      await User.create({
        name: users[0].name,
        email: users[0].email,
        password: users[0].password,
        passwordConfirm: users[0].passwordConfirm,
        role: users[0].role,
        referralCode: users[0].referralCode,
        referredBy: users[0].referredBy,
      });
    });

    it("should log in a user and return a token", async () => {
      const res = await api.post(`${baseUrl}/user/login`).send({
        email: "johndoe@example.com",
        password: "Password123!",
      });
      expect(res.status).toEqual(200);

      expect(res.body).toHaveProperty("status", "success");
      expect(res.body.data).toHaveProperty("token");
      userToken = res.body.data.token;
    });
  });

  describe("User Update", () => {
    beforeEach(async () => {
      const user = await User.create({
        name: users[0].name,
        email: users[0].email,
        password: users[0].password,
        passwordConfirm: users[0].passwordConfirm,
        role: users[0].role,
        referralCode: users[0].referralCode,
        referredBy: users[0].referredBy,
      });
      userToken = await user.generateAuthToken();
      userId = user._id.toString();
    });

    it("should update the user information", async () => {
      const res = await api
        .patch(`${baseUrl}/user/${userId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          name: "John Updated",
        });
      expect(res.status).toEqual(200);

      expect(res.body).toHaveProperty("status", "success");
      expect(res.body.message).toBe("User updated");
    });
  });

  describe("Delete User", () => {
    beforeEach(async () => {
      const user = await User.create({
        name: users[0].name,
        email: users[0].email,
        password: users[0].password,
        passwordConfirm: users[0].passwordConfirm,
        role: users[0].role,
        referralCode: users[0].referralCode,
        referredBy: users[0].referredBy,
      });
      userId = user._id.toString();
    });

    it("should delete a user by ID", async () => {
      const res = await api.delete(`${baseUrl}/user/${userId}`);
      expect(res.status).toEqual(200);

      expect(res.body).toHaveProperty("status", "success");
      expect(res.body.message).toBe("User deleted");
    });
  });

  describe("List Users", () => {
    beforeEach(async () => {
      const user = await User.create({
        name: users[0].name,
        email: users[0].email,
        password: users[0].password,
        passwordConfirm: users[0].passwordConfirm,
        role: users[0].role,
        referralCode: users[0].referralCode,
        referredBy: users[0].referredBy,
      });

      userToken = await user.generateAuthToken();
    });

    it("should return a list of users", async () => {
      const res = await api
        .get(`${baseUrl}/users`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toEqual(200);

      expect(res.body).toHaveProperty("status", "success");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });
  });
});
