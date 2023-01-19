import request from "supertest";
import { app } from "../../app";

async function createTicket() {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "dream live", price: 45 });
}

it("fetchs a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const res = await request(app).get("/api/tickets").send().expect(200);

  expect(res.body.length).toEqual(3);
});
