import { prisma } from '../lib/prisma';
import { ensureRedis } from '../config/redis';

export async function upsertCustomer(input: { id?: string; email: string; name: string; phone?: string }) {
  return prisma.customer.upsert({
    where: { email: input.email },
    update: { name: input.name, phone: input.phone },
    create: { email: input.email, name: input.name, phone: input.phone }
  });
}

export async function getCustomerWithHistory(id: string) {
  const redis = await ensureRedis();
  const cacheKey = `customer:${id}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      orders: { include: { items: true, tracking: true } },
      supportTickets: true
    }
  });

  if (customer) {
    await redis.set(cacheKey, JSON.stringify(customer), { EX: 60 * 5 });
  }

  return customer;
}
