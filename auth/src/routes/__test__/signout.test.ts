import request from "supertest";
import { app } from "../../app";

it("Clears the cookie after signing out", async () => {
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
      password: "nim1313",
    })
    .expect(200);

  const response = await await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  console.log(response.get("Set-Cookie"));
});
