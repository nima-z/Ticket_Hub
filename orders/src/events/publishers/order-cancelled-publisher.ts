import { Publisher, OrderCancelledEvent, Subjects } from "@nztickethub/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
