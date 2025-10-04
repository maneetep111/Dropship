import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { getCustomerWithHistory, upsertCustomer } from '../services/customerService';

const router = Router();

const customerSchema = z.object({ id: z.string().optional(), email: z.string().email(), name: z.string(), phone: z.string().optional() });

router.post('/', authenticate, async (req, res, next) => {
  try {
    const parsed = customerSchema.parse(req.body);
    const customer = await upsertCustomer(parsed);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

router.get('/:customerId', authenticate, async (req, res, next) => {
  try {
    const customer = await getCustomerWithHistory(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

export default router;
