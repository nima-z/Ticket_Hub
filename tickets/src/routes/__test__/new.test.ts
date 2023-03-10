import request from "supertest";
import { app } from "../../app";

it("has a listening server at /api/tickets", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("should send 401 code when user is not signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

// it("returns status other than 401 if user is signed in", async () => {
//   const response = await request(app)
//     .post("/api/tickets")
//     .set("Cookie", global.signin())
//     .send({});

//   expect(response.status).not.toEqual(401);
// });

// it("returns an error if an invalid title is provided", async () => {
//   await request(app)
//     .post("/api/tickets")
//     .set("Cookie", global.signin())
//     .send({title: '', price: 10});
//     .expect(400)

//   await request(app)
//     .post("/api/tickets")
//     .set("Cookie", global.signin())
//     .send({price: 10});
//     .expect(400)

// });
// it("returns an error if an invalid price is provided", async () => {
//   await request(app)
//     .post("/api/tickets")
//     .set("Cookie", global.signin())
//     .send({title: 'something', price: -10});
//     .expect(400)

//   await request(app)
//     .post("/api/tickets")
//     .set("Cookie", global.signin())
//     .send({title: 'something'});
//     .expect(400)
// });
// it("creates a ticket with valid inputs", async () => {

// let tickets = await Ticket.find({})
// expect(tickets.length).toEqual(0)

// await request(app)
//   .post("/api/tickets")
//   .set('Cookie', global.signin())
//   .send({ title: "something", price: 10 })
//   .expect(201);

// tickets = await Ticket.find({})
// expect(tickets.length).toEqual(1)
// expect(tickets[0].price).toEqual(10)
// });
