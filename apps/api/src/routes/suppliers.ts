import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { createSupplier, ingestCatalog, completeImport } from '../services/supplierService';
import { Marketplace, ImportStatus } from '@prisma/client';

const router = Router();

const supplierSchema = z.object({ name: z.string(), marketplace: z.nativeEnum(Marketplace) });
const ingestSchema = z.object({ supplierId: z.string(), payload: z.any() });
const completeSchema = z.object({
  status: z.nativeEnum(ImportStatus),
  drafts: z.array(z.object({ title: z.string(), cost: z.number(), price: z.number() }))
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const parsed = supplierSchema.parse(req.body);
    const supplier = await createSupplier(parsed.name, parsed.marketplace);
    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
});

router.post('/ingest', authenticate, async (req, res, next) => {
  try {
    const parsed = ingestSchema.parse(req.body);
    const job = await ingestCatalog(parsed.supplierId, parsed.payload);
    res.status(202).json(job);
  } catch (error) {
    next(error);
  }
});

router.post('/:importId/complete', authenticate, async (req, res, next) => {
  try {
    const parsed = completeSchema.parse(req.body);
    const importJob = await completeImport(req.params.importId, parsed.status, parsed.drafts);
    res.json(importJob);
  } catch (error) {
    next(error);
  }
});

export default router;
