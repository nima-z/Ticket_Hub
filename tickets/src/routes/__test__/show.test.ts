import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const fakeButValidId = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${fakeButValidId}`).send({}).expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const title = "Dream Live Show";
  const price = 45;

  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send({})
    .expect(200);

  expect(ticketRes.body.title).toEqual(title);
  expect(ticketRes.body.price).toEqual(price);
});
