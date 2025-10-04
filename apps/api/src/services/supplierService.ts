import { Marketplace, ImportStatus } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { ensureRedis } from '../config/redis';

export async function createSupplier(name: string, marketplace: Marketplace) {
  return prisma.supplier.upsert({
    where: { name_marketplace: { name, marketplace } },
    update: {},
    create: { name, marketplace }
  });
}

export async function ingestCatalog(supplierId: string, payload: unknown) {
  const job = await prisma.supplierImport.create({
    data: {
      supplierId,
      payload: payload as object,
      status: ImportStatus.PROCESSING
    }
  });

  const redis = await ensureRedis();
  await redis.publish('supplier:imports', JSON.stringify({ importId: job.id }));
  return job;
}

export async function completeImport(importId: string, status: ImportStatus, drafts: { title: string; cost: number; price: number }[]) {
  const importJob = await prisma.supplierImport.update({
    where: { id: importId },
    data: {
      status,
      completedAt: new Date(),
      draftProducts: {
        create: drafts.map((draft) => ({ title: draft.title, cost: draft.cost, price: draft.price }))
      }
    },
    include: { draftProducts: true }
  });
  return importJob;
}
