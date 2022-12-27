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

//Variables
let oneEventId, oneEventDay, eventId, signupId, signupEmail, signInToken = null;

//Connect to database before each test
beforeEach(async () => {
    await mongoose.connect(DB);
  });
  
//Close database after each test
afterEach(async () => {
  await mongoose.connection.close();
});

afterAll(async () => {
  //TO-DO
});

//GET ROUTES
//All events
describe("GET /api/v1/events", () => {
  it("should return all events", async () => {
    const res = await request(app).get("/api/v1/events");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success')

    //Variables (external)
    oneEventId = res.body.data.data[0]._id
    oneEventDay = res.body.data.data[0].dayOfWeek
  });
});

//Events by weekday
describe(`GET /api/v1/events?weekday=`, () => {
  it("should return all events with a specific day of the week", async () => {
    const res = await request(app).get(`/api/v1/events?weekday=${oneEventDay}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success')
  });
});

//Events by ID
describe(`GET /api/v1/events?_id=`, () => {
  it("should return an event with a specific id", async () => {
    const res = await request(app).get(`/api/v1/events?_id=${oneEventId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success')
  });
});

//POST ROUTES
//Create event
describe("POST /api/v1/events", () => {
  it("should create an event", async () => {
    const res = await request(app).post("/api/v1/events").send({
      description: "Test event.",
      dateTime: "2022-12-31T00:00:00.000Z",
      dayOfWeek: "sunday",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success')

    //Variables (external)
    eventId = res.body.data.data._id;
  });
});

//Sign Up
describe("POST /api/v1/users/signup", () => {
  it("should sign up a new user", async () => {
    const res = await request(app).post("/api/v1/users/signup").send({
      firstName: "Leonel",
      lastName: "Messi",
      birthDate: "1987-06-24T00:00:00.000Z",
      city: "Buenos Aires",
      country: "Argentina",
      email: "messi@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success')

    //Variables (external)
    signupEmail = res.body.data.user.email;
    signupId = res.body.data.user._id;
  });
});

//Sign In
describe("POST /api/v1/users/signin", () => {
  it("should sign in a current user", async () => {
    const res = await request(app).post("/api/v1/users/signin").send({
      email: `${signupEmail}`,
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success')

    //Variables (external)
    signInToken = res.body.token
  });
});

//DELETE ROUTES
//Delete event
describe(`DELETE /api/v1/events?id=`, () => {
  it("should delete an event", async () => {
    const res = await request(app)
    .delete(`/api/v1/events?id=${eventId}`)
    .set('authorization', `Bearer ${signInToken}`);
    expect(res.statusCode).toBe(204);
  });
});

//Delete user
describe(`DELETE /api/v1/users?id=`, () => {
  it("should delete a user", async () => {
    const res = await request(app)
    .delete(`/api/v1/users?id=${signupId}`)
    .set('authorization', `Bearer ${signInToken}`);
    expect(res.statusCode).toBe(204);
  });
});