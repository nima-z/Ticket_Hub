import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("Returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({
      ticketId,
    })
    .expect(404);
});
it("Returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 15,
  });
  await ticket.save();

  const order = Order.build({
    userId: "ksfghkjsdfhg",
    ticket,
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("Reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 15,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo("emits and order created event");
