import { TicketPriority, TicketStatus } from '@prisma/client';
import { prisma } from '../lib/prisma';

export async function createTicket(input: {
  subject: string;
  customerId: string;
  orderId?: string;
  priority?: TicketPriority;
}) {
  return prisma.supportTicket.create({
    data: {
      subject: input.subject,
      customerId: input.customerId,
      orderId: input.orderId,
      priority: input.priority ?? TicketPriority.MEDIUM
    }
  });
}

export async function updateTicketStatus(id: string, status: TicketStatus) {
  return prisma.supportTicket.update({ where: { id }, data: { status } });
}
