import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it("marks an order as cancelled", async () => {
  //create a ticket
  const ticket = Ticket.build({ title: "concert", price: 15 });
  await ticket.save();

  const user = global.signin();

  //make a request to create an order
  const { body: order } = await request(app)
    .post("/api/order")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  //expectaion to make sure the order is cancelled
  const updatedOder = await Order.findById(order.id);

  expect(updatedOder!.status).toEqual(OrderStatus.Cancelled);
});
