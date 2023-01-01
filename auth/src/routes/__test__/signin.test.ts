import request from "supertest";
import { app } from "../../app";

it("Fails when an email does not exist", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "nima@yahoo.com",
      password: "nim1313",
    })
    .expect(400);
});

it("Fails when password is incorrect on sign in", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nima@yahoo.com",
      password: "nim1313",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "nima@yahoo.com",
      password: "hahahaha",
    })
    .expect(400);
});

it("Respond with a cookie on a succesful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nima@yahoo.com",
      password: "nim1313",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "nima@yahoo.com",
      password: "nim1313",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
