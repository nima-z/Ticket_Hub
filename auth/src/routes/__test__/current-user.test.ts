import request from "supertest";
import { app } from "../../app";

it("Respond with current user details", async () => {
  const signUp = await request(app)
    .post("/api/users/signup")
    .send({
      email: "nima@yahoo.com",
      password: "nim1313",
    })
    .expect(201);

  const cookie = signUp.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("nima@yahoo.com");
});
