import { FulfillmentStatus, Marketplace } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { fetchOrders } from './integrationService';

export async function recordOrder(input: {
  orderNumber: string;
  customerId: string;
  channel: Marketplace;
  total: number;
  items: { productId: string; quantity: number; price: number }[];
}) {
  return prisma.order.create({
    data: {
      orderNumber: input.orderNumber,
      customerId: input.customerId,
      channel: input.channel,
      total: input.total,
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: { items: true }
  });
}

export async function updateFulfillment(orderId: string, status: FulfillmentStatus) {
  return prisma.order.update({ where: { id: orderId }, data: { fulfillment: status } });
}

export async function importMarketplaceOrders(channel: Marketplace) {
  const data = await fetchOrders(channel);
  return data;
}
