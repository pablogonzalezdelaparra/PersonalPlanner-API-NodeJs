const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

require("dotenv").config();

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(DB);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe("GET /api/v1/events", () => {
    it("should return all events", async () => {
      const res = await request(app).get("/api/v1/events");
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success')
    });
  });

  describe("GET /api/v1/events?weekday=sunday", () => {
    it("should return all sunday events", async () => {
      const res = await request(app).get("/api/v1/events?weekday=sunday");
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success')
    });
  });

  describe("GET /api/v1/events?_id=63977e330ae59c9fff94932f", () => {
    it("should return an event with a specific id", async () => {
      const res = await request(app).get("/api/v1/events?_id=63977e330ae59c9fff94932f");
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success')
    });
  });

  describe("POST /api/v1/events", () => {
    it("should create an event", async () => {
      const res = await request(app).post("/api/v1/events").send({
        description: "New event!",
        dateTime: "2022-12-13T00:00:00.000Z",
        dayOfWeek: "tuesday",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe('success')
    });
  });

  describe("POST /api/v1/users/signup", () => {
    it("should sign up a new user", async () => {
      const res = await request(app).post("/api/v1/users/signup").send({
        firstName: "Alfredo",
        lastName: "González de la Parra",
        birthDate: "2000-08-11T00:00:00.000Z",
        city: "Mexico City",
        country: "Mexico",
        email: "alfredo6@gmail.com",
        password: "password123",
        confirmPassword: "password123",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe('success')
    });
  });


  describe("POST /api/v1/users/signin", () => {
    it("should sign in a current user", async () => {
      const res = await request(app).post("/api/v1/users/signin").send({
        email: "alfredo2@gmail.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success')
    });
  });