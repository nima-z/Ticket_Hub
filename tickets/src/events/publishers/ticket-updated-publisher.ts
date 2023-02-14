import { Subjects, Publisher, TicketUpdatedEvent } from "@nztickethub/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.ticketUpdated = Subjects.ticketUpdated;
}
