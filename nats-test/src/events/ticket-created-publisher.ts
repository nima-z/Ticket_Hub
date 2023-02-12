import { Publisher } from "./base_publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
}
