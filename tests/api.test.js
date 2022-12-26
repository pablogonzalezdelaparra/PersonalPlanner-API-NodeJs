//Imports
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const dotenv = require('dotenv');

//Paths
dotenv.config({ path: './config.env' });
require("dotenv").config();

//Database connection
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

//Connect to database before each test
beforeEach(async () => {
    await mongoose.connect(DB);
  });
  
//Close database after each test
afterEach(async () => {
  await mongoose.connection.close();
});

//GET ROUTES
//Events
describe("GET /api/v1/events", () => {
  it("should return all events", async () => {
    const res = await request(app).get("/api/v1/events");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success')
  });
});

//Events by weekday
describe("GET /api/v1/events?weekday=sunday", () => {
  it("should return all sunday events", async () => {
    const res = await request(app).get("/api/v1/events?weekday=sunday");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success')
  });
});

//Events by ID
describe("GET /api/v1/events?_id=63977e330ae59c9fff94932f", () => {
  it("should return an event with a specific id", async () => {
    const res = await request(app).get("/api/v1/events?_id=63977e330ae59c9fff94932f");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success')
  });
});

//POST ROUTES
//Events
describe("POST /api/v1/events", () => {
  it("should create an event", async () => {
    const res = await request(app).post("/api/v1/events").send({
      description: "Test event!",
      dateTime: "2022-12-13T00:00:00.000Z",
      dayOfWeek: "monday",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success')
  });
});

//Sign Up
describe("POST /api/v1/users/signup", () => {
  it("should sign up a new user", async () => {
    const res = await request(app).post("/api/v1/users/signup").send({
      firstName: "Leonel",
      lastName: "Messi",
      birthDate: "2000-08-11T00:00:00.000Z",
      city: "Buenos Aires",
      country: "Argentina",
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success')
  });
});

//Sign In
describe("POST /api/v1/users/signin", () => {
  it("should sign in a current user", async () => {
    const res = await request(app).post("/api/v1/users/signin").send({
      email: "test@gmail.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success')
  });
});