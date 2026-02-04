# Inventory Backend

Production-style Node.js + TypeScript backend that provides a solid foundation for inventory and operations systems. It includes authentication, RBAC, auditing, and a clean, modular service layout to support real-world backend patterns.

**Problem Solved**
This project standardizes core backend capabilities that inventory or operations platforms typically need: secure access, user management, auditing, and consistent API and validation patterns. It aims to reduce time-to-feature by shipping a stable, extensible base.

**Tech Stack**
- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- Zod (schema validation)
- express-session (session management)
- Helmet (security headers)
- express-rate-limit (basic rate limiting)
- ioredis (Redis client)
- Vitest + Supertest (tests)

**Key Features**
- Modular, feature-based routing under `src/modules`
- JWT access/refresh flow with refresh token rotation
- Session-based user attachment for server-side flows
- RBAC middleware (`ADMIN`, `STAFF`, `USER`)
- Request validation with Zod
- Centralized error handling and request logging
- Health check endpoint
- Audit log module

**Project Structure**
```text
.
├── prisma/
│   └── schema.prisma
├── generated/
│   └── prisma/          # Prisma client output
├── src/
│   ├── app.ts           # Express app wiring
│   ├── server.ts        # App entry point
│   ├── config/          # env, prisma, redis, session
│   ├── middlewares/     # auth, rbac, validation, logging, rate-limit
│   ├── modules/         # feature modules
│   │   ├── auth/
│   │   ├── audit/
│   │   └── users/
│   ├── routes/          # API version routing
│   ├── types/           # Express type augmentation
│   ├── utils/           # shared helpers
│   └── __tests__/       # vitest tests
└── tsconfig.json
```

**API Overview**
- `GET /health`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/mobile/login`
- `POST /api/v1/auth/mobile/refresh`
- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `POST /api/v1/users`
- `GET /api/v1/audit-logs`

**Setup**
1. Install dependencies.
```bash
npm install
```
2. Configure environment variables.
Create a `.env` file with at least:
```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
SESSION_SECRET=your-session-secret
PORT=3000
NODE_ENV=development
```
3. Generate Prisma client.
```bash
npx prisma generate
```
4. Run database migrations (if you add migrations).
```bash
npx prisma migrate dev
```
5. Start the server.
```bash
npm run dev
```

**Scripts**
- `npm run dev` - run locally with ts-node-dev
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run compiled server
- `npm test` - run vitest suite

**Notes**
- Prisma schema lives at `prisma/schema.prisma`.
- The API is mounted under `/api/v1` in `src/routes/v1.ts`.
