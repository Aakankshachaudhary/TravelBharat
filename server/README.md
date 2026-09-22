# TravelBharat API

Phase 5 backend for the TravelBharat tourism platform.

## Stack
- Node.js 20+
- Express
- MongoDB + Mongoose
- Zod validation
- Helmet, CORS, Morgan
- REST API

## Setup

```bash
cd server
npm install
copy .env.example .env
```

On Git Bash, use:

```bash
cp .env.example .env
```

Make sure MongoDB is running, then:

```bash
npm run seed
npm run dev
```

API: `http://localhost:5000`

Health check: `http://localhost:5000/api/health`

The client expects:

```text
VITE_API_BASE_URL=http://localhost:5000/api
```

Create `client/.env` from `client/.env.example`.

### Admin mutation protection

POST/PUT/DELETE destination endpoints require:

```text
x-admin-api-key: <ADMIN_API_KEY>
```

This is an interim API protection layer for Phase 5. JWT-based admin authentication belongs to Phase 6.
