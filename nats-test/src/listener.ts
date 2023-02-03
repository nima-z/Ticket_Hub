import nats, { Message } from "node-nats-streaming";
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

  stan.on("close", () => {
    console.log("NATS connection is closed");
    process.exit();
  });

  // we can add option to our channel as the third argument
  // in order to save event in case of failure, we can set the ack mode TRUE
  // in Ack mode TRUE, the nats server will constantly send a same event to another instance until we tell the server that everything is ok.

  const options = stan.subscriptionOptions().setManualAckMode(true);

  // all same instances will receive a same event
  // to send an event to only one instance of a service, we have to create a QUEUE GROUP
  // second argument below represents the queue group name
  const subscription = stan.subscribe(
    "ticket:created",
    "ticket-service-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Event #${msg.getSequence()}, data: ${data}`);
    }

    // if everything is ok, we can tell the nats server to end sending the saved event.
    // it means that we received that event and the process has been done.
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
