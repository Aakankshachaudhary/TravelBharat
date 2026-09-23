# Phase 6 – Authentication & Admin Content Management

## Objective

Turn the TravelBharat API into a real content-management workflow where public users can consume travel data while authorized administrators can securely maintain destination records.

## Implemented

1. JWT access-token authentication.
2. Password hashing using Node.js `crypto.scrypt` with unique salts.
3. Admin and editor roles.
4. Protected `/api/auth/me` endpoint.
5. Protected destination create/update/delete endpoints.
6. Admin login screen in React.
7. Protected admin route.
8. Admin dashboard with catalogue search, metrics and CRUD forms.
9. Environment-based JWT and admin configuration.
10. Existing MongoDB admin records are upgraded with a password hash when seed configuration is supplied.

## Security flow

```text
Admin Login
    ↓
POST /api/auth/login
    ↓
Verify hashed password
    ↓
Issue signed JWT
    ↓
Browser stores session token
    ↓
Bearer token on protected API requests
    ↓
JWT verification + active-admin lookup
    ↓
Role authorization
    ↓
Destination mutation
```

## Production hardening roadmap

The current phase is suitable as a portfolio implementation. For a production deployment, the next security layer would be HttpOnly cookie sessions, refresh-token rotation, rate limiting, audit logs, automated tests, image storage and CI/CD.
