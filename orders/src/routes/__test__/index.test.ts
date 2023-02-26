import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 15,
  });

  await ticket.save();
  return ticket;
};

it("Fetches orders for a particular user", async () => {
  // create three tickets
  const ticket_1 = await buildTicket();
  const ticket_2 = await buildTicket();
  const ticket_3 = await buildTicket();

  const user_1 = global.signin();
  const user_2 = global.signin();

  // create one order as USER #1
  await request(app)
    .post("/api/orders")
    .set("Cookie", user_1)
    .send({ ticketId: ticket_1.id })
    .expect(201);

  // create two tickets as USER #2
  await request(app)
    .post("/api/orders")
    .set("Cookie", user_2)
    .send({ ticketId: ticket_2.id })
    .expect(201);
  await request(app)
    .post("/api/orders")
    .set("Cookie", user_2)
    .send({ ticketId: ticket_3.id })
    .expect(201);

  // make request to get orders for USER #2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", user_2)
    .expect(200);

  // make sure we only got hte orders for USER #2
  expect(response.body.length).toEqual(2);
});
