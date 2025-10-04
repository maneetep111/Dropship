import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { Marketplace } from '@prisma/client';
import { publishProductFromDraft, updateInventory } from '../services/productService';

const router = Router();

const publishSchema = z.object({
  draftId: z.string(),
  marketplaces: z.array(z.nativeEnum(Marketplace))
});

const inventorySchema = z.object({ stock: z.number(), price: z.number().optional() });

router.post('/publish', authenticate, async (req, res, next) => {
  try {
    const parsed = publishSchema.parse(req.body);
    const product = await publishProductFromDraft(parsed.draftId, parsed.marketplaces);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:productId/inventory', authenticate, async (req, res, next) => {
  try {
    const parsed = inventorySchema.parse(req.body);
    const product = await updateInventory(req.params.productId, parsed.stock, parsed.price);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
