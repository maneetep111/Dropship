import axios from 'axios';
import { Marketplace } from '@prisma/client';

const endpoints: Record<Marketplace, string> = {
  [Marketplace.AMAZON]: 'https://api.amazon.com/products',
  [Marketplace.EBAY]: 'https://api.ebay.com/inventory_item',
  [Marketplace.ALIEXPRESS]: 'https://api.aliexpress.com/items',
  [Marketplace.ONBUY]: 'https://apicenter.onbuy.com/v2/products'
};

type SyncPayload = {
  sku: string;
  title: string;
  price: number;
  stock: number;
  description?: string | null;
};

export async function syncProduct(marketplace: Marketplace, payload: SyncPayload) {
  const url = endpoints[marketplace];
  // In production we would sign requests with marketplace specific auth. Here we simulate a POST.
  await axios.post(url, payload, { timeout: 5000 });
  return { success: true };
}

export async function fetchOrders(marketplace: Marketplace) {
  const url = `${endpoints[marketplace]}/orders`;
  const { data } = await axios.get(url, { timeout: 5000 });
  return data;
}
