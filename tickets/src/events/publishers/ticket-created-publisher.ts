import { Subjects, Publisher, TicketCreatedEvent } from "@nztickethub/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
}
