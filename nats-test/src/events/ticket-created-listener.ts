import { Listener } from "./base_listener";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener {
  subject = "ticket:created";
  queueGroupName = "payment-service";

  onMessage(data: any, msg: Message) {
    console.log("Event Data: ", data);

    msg.ack();
  }
}
