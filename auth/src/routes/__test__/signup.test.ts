import request from "supertest";
import { app } from "../../app";

it("Returns 201 on a successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "nima@yahoo.com",
      password: "nima1313",
    })
    .expect(201);
});

it("Returns 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "nima",
      password: "sdfhoilgkn",
    })
    .expect(400);
});

it("Returns 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "nima@yahoo.com",
      password: "sd",
    })
    .expect(400);
});

it("Returns 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nima",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "sdfhoilgkn",
    })
    .expect(400);
});

it("Returns 400 with an existing email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nima@yahoo.com",
      password: "sdsdffhrh",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nima@yahoo.com",
      password: "sdsdffhrh",
    })
    .expect(400);
});

it("Return cookie header on a successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "nima@yahoo.com",
      password: "sdsdffhrh",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
