import nats from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";
import { randomBytes } from "crypto";

console.clear();

// second argument below represents the ID of channel
// we can make multipple instances of a service by giving different IDs
// all same instances will receive a same event
const stan = nats.connect("tickethub", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener connected to nats");

  // to kill the process before closing the channel
  stan.on("close", () => {
    console.log("NATS connection is closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// before closing the client (channel), we can manually kill the process (shuting down)
// to prevent creating any additioanl channel by nats streaming
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
