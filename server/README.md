# TravelBharat API

Express + MongoDB REST API for the TravelBharat application.

## Features

- MongoDB/Mongoose persistence
- Public state and destination APIs
- Search/filter/sort support
- Zod validation
- Centralized error handling
- Helmet and CORS
- JWT authentication
- Role-based admin authorization
- Secure password hashing with Node.js `crypto.scrypt`
- Admin destination CRUD

## Commands

```bash
npm install
npm run dev
npm run seed
```

Configure `server/.env` using `.env.example`. Required values include `MONGODB_URI` and `JWT_SECRET`; configure `ADMIN_EMAIL` and `ADMIN_PASSWORD` when seeding the admin account.
