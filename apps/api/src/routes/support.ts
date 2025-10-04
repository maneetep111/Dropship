import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { createTicket, updateTicketStatus } from '../services/supportService';
import { TicketPriority, TicketStatus } from '@prisma/client';

const router = Router();

const ticketSchema = z.object({
  subject: z.string(),
  customerId: z.string(),
  orderId: z.string().optional(),
  priority: z.nativeEnum(TicketPriority).optional()
});

const statusSchema = z.object({ status: z.nativeEnum(TicketStatus) });

router.post('/', authenticate, async (req, res, next) => {
  try {
    const parsed = ticketSchema.parse(req.body);
    const ticket = await createTicket(parsed);
    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
});

router.patch('/:ticketId/status', authenticate, async (req, res, next) => {
  try {
    const parsed = statusSchema.parse(req.body);
    const ticket = await updateTicketStatus(req.params.ticketId, parsed.status);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

export default router;
