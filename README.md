# TravelBharat — Explore India State by State

TravelBharat is a full-stack tourism information platform that organises Indian states, union territories and destination guides into one connected travel experience.

The project is built as a realistic portfolio application with a React frontend, Express REST API, MongoDB persistence and an authenticated admin content-management workflow.

## Current implementation

- 36 Indian states and union territories
- 41 destination guides
- State and destination detail pages
- Search, filtering and sorting
- Responsive React interface
- REST API with Express and MongoDB/Mongoose
- Zod request validation
- Centralised API error handling
- JWT-based admin authentication
- Admin/editor role authorization
- Admin destination create, update and delete workflow
- Production-quality loading, empty and error states
- Accessibility improvements and keyboard navigation support
- Route-level code splitting with React `lazy`
- Short-lived client GET caching with mutation invalidation
- Dynamic page titles and descriptions
- Image fallback handling and layout-stable image dimensions

## Technology stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Node.js 20+
- Express.js
- MongoDB
- Mongoose
- Zod
- JWT authentication
- Helmet
- CORS
- Morgan
- Node.js `crypto.scrypt` password hashing

## Project structure

```text
TravelBharat/
├── client/
│   ├── public/
│   │   └── assets/
│   └── src/
│       ├── components/
│       ├── constants/
│       ├── data/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       └── utils/
├── server/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── data/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── validators/
└── docs/
```

## Local setup

### 1. Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

### 2. Backend

```bash
cd server
npm install
```

Create `server/.env` from `server/.env.example` and provide your own MongoDB and authentication configuration.

Never commit `server/.env` or any database credentials/secrets.

Start the API:

```bash
npm run dev
```

The local API runs on port `5000` by default.

## Useful checks

Frontend:

```bash
npm run lint
npm run build
```

Backend:

```bash
npm run dev
```

Health endpoint:

```text
http://localhost:5000/api/health
```

## Main routes

Public:

- `/`
- `/states`
- `/states/:stateSlug`
- `/destinations/:destinationSlug`
- `/search`
- `/about`

Admin:

- `/admin/login`
- `/admin`

## Development phases

- Phase 1 — Planning & Architecture
- Phase 2 — React Frontend Foundation
- Phase 3 — State & Destination System
- Phase 4 — Search & Discovery
- Phase 5 — Backend + MongoDB
- Phase 6 — JWT Admin Authentication & Content Management
- Phase 7 — Production Quality
- Phase 8 — Deployment

## Security notes

- Database credentials remain in environment variables.
- Admin passwords are hashed on the backend.
- Admin destination mutations require a valid JWT and authorized role.
- The frontend never connects directly to MongoDB.
- Admin routes are excluded from `robots.txt`.

## Documentation

Detailed architecture and implementation notes are available in the `docs/` directory, including `phase-7-production-quality.md` and `auth-and-admin.md`.
