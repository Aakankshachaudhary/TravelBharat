# Phase 8 — Deployment & Production Readiness

## Objective

Prepare TravelBharat for deployment as a separate React frontend and Express/MongoDB API while keeping secrets outside source control.

## Deployment architecture

- Frontend: Vercel
- Backend API: Render Web Service
- Database: MongoDB Atlas
- Frontend communicates with the backend through `VITE_API_BASE_URL`.
- The backend reads production secrets from the hosting provider's environment variables.

## Frontend deployment

1. Import the repository into Vercel.
2. Set the project root to `client`.
3. Vercel will use the Vite build configuration from `client/package.json`.
4. Add the production environment variable:

```env
VITE_API_BASE_URL=https://YOUR-RENDER-SERVICE.onrender.com/api
```

5. Deploy.

`client/vercel.json` rewrites application routes to `index.html`, allowing React Router URLs such as `/states/rajasthan` and `/admin/login` to work after a direct refresh.

## Backend deployment

The root `render.yaml` contains the Render Blueprint configuration. The backend uses:

- Root directory: `server`
- Build command: `npm ci`
- Start command: `npm start`
- Health check: `/api/health/ready`

Set these environment variables in Render:

```env
NODE_ENV=production
MONGODB_URI=<MongoDB Atlas connection string>
JWT_SECRET=<long random secret>
CLIENT_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
JWT_EXPIRES_IN=8h
ADMIN_EMAIL=<admin email>
ADMIN_PASSWORD=<strong initial password>
SEED_ON_START=false
```

Do not commit the values above to Git.

## MongoDB Atlas

Before deployment:

1. Create the production database user in MongoDB Atlas.
2. Configure Atlas Network Access for the deployed backend environment.
3. Use the production database connection string in `MONGODB_URI`.
4. Keep `SEED_ON_START=false` for production so a server restart does not unexpectedly reseed content.

## Health checks

- `GET /api/health` is the liveness endpoint. It confirms the API process is responding and reports database state.
- `GET /api/health/ready` is the readiness endpoint. It returns HTTP 200 only when MongoDB is connected and HTTP 503 when the API is not ready to serve database-backed traffic.

## Production checklist

- [ ] MongoDB Atlas production database configured.
- [ ] Production database credentials stored only in Render environment variables.
- [ ] Strong JWT secret configured.
- [ ] Production admin password configured and not committed.
- [ ] `CLIENT_URL` matches the deployed Vercel origin.
- [ ] Vercel `VITE_API_BASE_URL` points to the deployed Render API.
- [ ] Render health check reports healthy.
- [ ] Public state and destination pages load after direct URL refresh.
- [ ] Admin login works over HTTPS.
- [ ] Create/update/delete destination operations work in production.
- [ ] `SEED_ON_START=false` in production.
- [ ] No `.env` file or secret appears in Git history.

## Deployment boundary

Phase 8 adds deployment configuration and production runtime readiness. It does not claim that the application has already been deployed to a user's Vercel, Render, or MongoDB accounts.
