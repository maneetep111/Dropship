# Product Requirements Document: Dropship Operations Platform

## Overview
The Dropship Operations Platform streamlines supplier imports, product lifecycle management, order tracking, and customer support across major marketplaces. The application consists of a Next.js dashboard for operations teams and a Node.js API orchestrating integrations with eBay, Amazon, AliExpress, and OnBuy.

## User Roles
- **Admin**: Full access to all modules, settings, and integrations.
- **Operations Manager**: Manages suppliers, products, and orders. Can view metrics and update statuses.
- **Support Agent**: Handles customer communications and support tickets.

## Modules
### Dashboard
- Display high-level metrics (GMV, total orders, fulfillment rate, support SLA).
- Show recent supplier imports and outstanding support tickets.

### Drafts
- List drafted products awaiting publication. Provide actions to publish to marketplaces or archive.
- Surface import source, profitability score, and assigned manager.

### Products
- Searchable table of all live products with status, stock, channel coverage, and pricing.
- Support quick edits (price/stock) and display marketplace sync status.

### Orders
- Table of recent orders with fulfillment progress, tracking data, and supplier confirmations.
- Support mass status updates and issue flagging.

### Customers
- Provide customer overview with lifetime value, recent orders, and contact preferences.
- Allow linking to open support tickets and order history.

### Customer Support
- Display ticket queue with priority, SLA timers, and linked orders/customers.
- Enable quick responses and escalation to operations when product or order action required.

## Cross-Module Interactions
- Selecting a product highlights related draft/import info and outstanding support tickets.
- Opening a customer profile reveals orders and active tickets.
- Order rows link to associated customers and fulfillment actions.

## API Requirements
- Ingest supplier catalogs and create drafts.
- Manage product lifecycle (draft, published, retired).
- Track order status, shipment updates, and issues.
- Store customer profiles, order history, and support tickets.
- Integrate with eBay, Amazon, AliExpress, and OnBuy for product sync and order import.

## Technical Requirements
- Frontend: Next.js 13+ with App Router, TypeScript, Tailwind CSS, component-driven architecture.
- Backend: Node.js (Express + Prisma) with PostgreSQL, Redis caching, JWT auth, optional OAuth providers.
- Testing: Component tests for critical UI, API tests for lifecycle operations.
- Observability: Structured logging, request metrics, and health checks.

