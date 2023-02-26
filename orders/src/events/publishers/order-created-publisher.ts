import { Publisher, OrderCreatedEvent, Subjects } from "@nztickethub/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
