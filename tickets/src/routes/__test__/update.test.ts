import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

it("Returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "nima", price: 50 })
    .expect(404);
});
it("Returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "nima", price: 50 })
    .expect(401);
});
it("Returns a 401 if user does not own the ticket", async () => {
  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title: "nima", price: 50 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "hay", price: 23 })
    .expect(401);
});
it("Returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "nima", price: 50 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 23 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "hay", price: -2 })
    .expect(400);
});
it("updates the ticket with valid inputs", async () => {
  const cookie = global.signin();

  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "nima", price: 50 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "hay", price: 23 })
    .expect(200);

  const resTicket = await request(app).get(`/api/ticket/${res.body.id}`).send();

  expect(resTicket.body.title).toEqual("hay");
  expect(resTicket.body.price).toEqual(23);
});

it("Publish an event", async () => {
  const cookie = global.signin();

  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "nima", price: 50 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "hay", price: 23 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
