export type Metric = {
  name: string;
  value: string;
  delta?: string;
  positive?: boolean;
};

export const metrics: Metric[] = [
  { name: 'Gross Merchandise Value', value: '$420K', delta: '+12.4%', positive: true },
  { name: 'Orders', value: '3,421', delta: '+4.1%', positive: true },
  { name: 'Fulfillment Rate', value: '96.7%', delta: '-1.3%', positive: false },
  { name: 'Support SLA', value: '1.8h', delta: '+0.3h', positive: false }
];

export type SupplierImport = {
  id: string;
  supplier: string;
  marketplace: string;
  createdAt: string;
  status: 'processing' | 'completed' | 'failed';
};

export const recentImports: SupplierImport[] = [
  { id: 'imp_101', supplier: 'Shenzhen Gadgets', marketplace: 'AliExpress', createdAt: '2023-11-02', status: 'completed' },
  { id: 'imp_102', supplier: 'UK Direct', marketplace: 'OnBuy', createdAt: '2023-11-01', status: 'processing' },
  { id: 'imp_103', supplier: 'Prime Partners', marketplace: 'Amazon', createdAt: '2023-10-31', status: 'failed' }
];

export type DraftProduct = {
  id: string;
  name: string;
  category: string;
  profitability: number;
  source: string;
  manager: string;
};

export const draftProducts: DraftProduct[] = [
  { id: 'draft-1', name: 'Wireless Earbuds', category: 'Electronics', profitability: 68, source: 'AliExpress', manager: 'Casey' },
  { id: 'draft-2', name: 'Ergonomic Chair', category: 'Home Office', profitability: 55, source: 'Amazon', manager: 'Jordan' },
  { id: 'draft-3', name: 'LED Desk Lamp', category: 'Lighting', profitability: 72, source: 'eBay', manager: 'Casey' }
];

export type Product = {
  id: string;
  title: string;
  sku: string;
  stock: number;
  price: number;
  status: 'active' | 'out_of_stock' | 'paused';
  channels: string[];
  syncState: 'synced' | 'pending' | 'error';
};

export const products: Product[] = [
  { id: 'prod-1', title: 'Standing Desk', sku: 'DESK-001', stock: 54, price: 399.0, status: 'active', channels: ['Amazon', 'eBay'], syncState: 'synced' },
  { id: 'prod-2', title: 'Noise Cancelling Headphones', sku: 'AUD-100', stock: 12, price: 149.99, status: 'active', channels: ['Amazon', 'OnBuy'], syncState: 'pending' },
  { id: 'prod-3', title: 'Smartwatch Series 5', sku: 'WATCH-5', stock: 0, price: 199.99, status: 'out_of_stock', channels: ['AliExpress'], syncState: 'error' }
];

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerId: string;
  channel: string;
  total: number;
  fulfillment: 'pending' | 'in_progress' | 'fulfilled' | 'issue';
  tracking?: string;
};

export const orders: Order[] = [
  { id: 'ord-1', orderNumber: 'A-10092', customerName: 'Logan Reeves', customerId: 'cust-1', channel: 'Amazon', total: 249.99, fulfillment: 'fulfilled', tracking: '1Z234' },
  { id: 'ord-2', orderNumber: 'E-78421', customerName: 'Morgan Lee', customerId: 'cust-2', channel: 'eBay', total: 89.5, fulfillment: 'in_progress', tracking: '9400' },
  { id: 'ord-3', orderNumber: 'O-66750', customerName: 'Alex Murphy', customerId: 'cust-3', channel: 'OnBuy', total: 39.99, fulfillment: 'issue' }
];

export type Customer = {
  id: string;
  name: string;
  lifetimeValue: number;
  email: string;
  recentOrders: string[];
  preferredChannel: string;
  openTickets: string[];
};

export const customers: Customer[] = [
  { id: 'cust-1', name: 'Logan Reeves', lifetimeValue: 1520.45, email: 'logan@example.com', recentOrders: ['A-10092', 'A-10011'], preferredChannel: 'Email', openTickets: [] },
  { id: 'cust-2', name: 'Morgan Lee', lifetimeValue: 890.0, email: 'morgan@example.com', recentOrders: ['E-78421'], preferredChannel: 'Chat', openTickets: ['SUP-301'] },
  { id: 'cust-3', name: 'Alex Murphy', lifetimeValue: 430.76, email: 'alex@example.com', recentOrders: ['O-66750'], preferredChannel: 'Phone', openTickets: ['SUP-302', 'SUP-305'] }
];

export type SupportTicket = {
  id: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  slaExpiresIn: string;
  orderNumber?: string;
  customerId: string;
  status: 'open' | 'waiting' | 'resolved';
};

export const tickets: SupportTicket[] = [
  { id: 'SUP-301', subject: 'Order delayed shipment', priority: 'high', slaExpiresIn: '0h 45m', orderNumber: 'E-78421', customerId: 'cust-2', status: 'open' },
  { id: 'SUP-302', subject: 'Received damaged item', priority: 'high', slaExpiresIn: '1h 20m', orderNumber: 'O-66750', customerId: 'cust-3', status: 'waiting' },
  { id: 'SUP-305', subject: 'Requesting invoice', priority: 'low', slaExpiresIn: '6h 10m', customerId: 'cust-3', status: 'open' }
];
