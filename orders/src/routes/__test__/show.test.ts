import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("Fetches the order", async () => {
  //create a ticket
  const ticket = Ticket.build({ title: "concert", price: 15 });
  await ticket.save();

  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchOrder.id).toEqual(order.Id);
});

it("Returns an error when a user tries to fetch another users order", async () => {
  //create a ticket
  const ticket = Ticket.build({ title: "concert", price: 15 });
  await ticket.save();

  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
