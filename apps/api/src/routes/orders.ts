import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { FulfillmentStatus, Marketplace } from '@prisma/client';
import { importMarketplaceOrders, recordOrder, updateFulfillment } from '../services/orderService';

const router = Router();

const orderSchema = z.object({
  orderNumber: z.string(),
  customerId: z.string(),
  channel: z.nativeEnum(Marketplace),
  total: z.number(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number(), price: z.number() }))
});

const fulfillmentSchema = z.object({ status: z.nativeEnum(FulfillmentStatus) });

router.post('/', authenticate, async (req, res, next) => {
  try {
    const parsed = orderSchema.parse(req.body);
    const order = await recordOrder(parsed);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.patch('/:orderId/fulfillment', authenticate, async (req, res, next) => {
  try {
    const parsed = fulfillmentSchema.parse(req.body);
    const order = await updateFulfillment(req.params.orderId, parsed.status);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/import/:channel', authenticate, async (req, res, next) => {
  try {
    const channel = Marketplace[req.params.channel as keyof typeof Marketplace];
    if (!channel) {
      return res.status(400).json({ message: 'Invalid channel' });
    }
    const data = await importMarketplaceOrders(channel);
    res.json({ imported: data });
  } catch (error) {
    next(error);
  }
});

export default router;
