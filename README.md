# Dropship Operations Platform

Monorepo containing the Dropship operations dashboard (Next.js) and backend API (Express + Prisma). The platform centralises supplier imports, product lifecycle management, order tracking, and customer support workflows across major marketplaces.

## Project Structure

```
./apps
  ├── api   # Express REST API with Prisma, PostgreSQL, Redis, and Jest tests
  └── web   # Next.js 13 App Router frontend with Tailwind CSS
```

Additional documentation lives in [`docs/PRD.md`](docs/PRD.md).

## Getting Started

### Prerequisites

- Node.js 18+
- npm 8+ (or compatible package manager)
- PostgreSQL 14+
- Redis 6+

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy the provided example file and adjust credentials:

```bash
cp apps/api/.env.example apps/api/.env
```

Update `DATABASE_URL`, OAuth credentials, and JWT secret as needed. The Next.js app consumes the API via `NEXT_PUBLIC_API_BASE_URL`, which can be set in `apps/web/.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

### Database Setup

Generate Prisma client and apply migrations:

```bash
cd apps/api
npx prisma generate
npx prisma migrate deploy
```

### Development Servers

Run API and frontend in parallel from the repository root:

```bash
# Terminal 1 - API
cd apps/api
npm run dev

# Terminal 2 - Web
cd apps/web
npm run dev
```

The frontend is available at `http://localhost:3000` and the API at `http://localhost:4000`.

### Testing

API service tests use Jest with lightweight mocks:

```bash
cd apps/api
npm test
```

Frontend testing can be performed with Testing Library (no example specs included yet):

```bash
cd apps/web
npm test
```

## Deployment Notes

1. **API**
   - Build the TypeScript project: `npm run build` inside `apps/api`.
   - Configure environment variables for Postgres, Redis, JWT secret, and OAuth credentials.
   - Run database migrations before first deploy: `npx prisma migrate deploy`.
   - Provision logging aggregation; logs are structured JSON via `logger.ts` helpers.
   - Attach monitoring to the `/healthz` endpoint for uptime probes.

2. **Frontend**
   - Build with `npm run build` inside `apps/web`.
   - Set `NEXT_PUBLIC_API_BASE_URL` to the deployed API URL.
   - Configure hosting (Vercel, Netlify, etc.) with environment variables and Node 18 runtime.

3. **Caching & Rate Limiting**
   - Redis is required for supplier import pub/sub and caching.
   - Express rate limiting is enabled globally (120 req/minute by default). Adjust via `apiLimiter`.

4. **Authentication**
   - The API uses JWT bearer tokens for authenticated calls. Obtain tokens via `/api/auth/login`.
   - OAuth integrations for Google and GitHub are registered with Passport strategies. Update callback URLs according to hosting provider.

## Monitoring & Observability

- Requests are logged via `morgan` and custom JSON logger helpers.
- Extend metrics collection by scraping logs or integrating with APM services.

## Contributing

- Follow the structure defined in `docs/PRD.md` when extending UI or API endpoints.
- Add Jest or Testing Library specs for new critical flows.

## License

MIT
