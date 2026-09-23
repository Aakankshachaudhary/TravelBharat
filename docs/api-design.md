# TravelBharat — API Design

## 1. Document Purpose

This document defines the REST API design for the TravelBharat platform.

The API layer will connect the React frontend with the Node.js and Express.js backend and provide controlled access to tourism information and administrative operations.

The API design focuses on:

- Clear and predictable endpoints
- Consistent request and response structures
- Secure administrative operations
- Input validation
- Proper HTTP status codes
- Search and filtering support
- Future scalability

---

## 2. API Architecture

TravelBharat will use RESTful APIs.

```text
React Frontend
      ↓
HTTP Request
      ↓
Express.js REST API
      ↓
Business Logic
      ↓
MongoDB
      ↓
JSON Response
      ↓
React Frontend
```

The frontend will never communicate directly with MongoDB.

---

## 3. Base URL

During local development, the API will use:

```text
http://localhost:5000/api
```

The production API URL will be configured through an environment variable.

Example:

```text
API_BASE_URL=https://api.example.com/api
```

The actual production URL will be added during deployment.

---

## 4. API Versioning

The initial project will use version 1 of the API.

Recommended structure:

```text
/api/v1
```

Example:

```text
/api/v1/states
/api/v1/cities
/api/v1/places
```

Versioning allows future API changes without immediately breaking existing clients.

---

## 5. API Resource Structure

The main API resources are:

```text
States
Cities
Tourist Places
Categories
Authentication
Admin Management
```

Relationship:

```text
State
  ↓
City
  ↓
Tourist Place
  ↓
Category
```

---

## 6. States API

### Get All States

```http
GET /api/v1/states
```

Purpose:

Returns the list of Indian states and union territories available on TravelBharat.

Access:

```text
Public
```

Example response:

```json
{
  "success": true,
  "data": [
    {
      "id": "state_id",
      "name": "Rajasthan",
      "slug": "rajasthan"
    }
  ]
}
```

### Get State by ID

```http
GET /api/v1/states/:stateId
```

Purpose:

Returns information about a specific state.

Access:

```text
Public
```

### Create State

```http
POST /api/v1/states
```

Access:

```text
Admin
```

### Update State

```http
PUT /api/v1/states/:stateId
```

Access:

```text
Admin
```

### Delete State

```http
DELETE /api/v1/states/:stateId
```

Access:

```text
Admin
```

---

## 7. Cities API

### Get Cities

```http
GET /api/v1/cities
```

Optional state filter:

```http
GET /api/v1/cities?state=rajasthan
```

Access:

```text
Public
```

### Get City by ID

```http
GET /api/v1/cities/:cityId
```

Access:

```text
Public
```

### Create City

```http
POST /api/v1/cities
```

Access:

```text
Admin
```

### Update City

```http
PUT /api/v1/cities/:cityId
```

Access:

```text
Admin
```

### Delete City

```http
DELETE /api/v1/cities/:cityId
```

Access:

```text
Admin
```

---

## 8. Tourist Places API

### Get Tourist Places

```http
GET /api/v1/places
```

Purpose:

Returns tourist destinations.

Access:

```text
Public
```

### Get Tourist Place by ID

```http
GET /api/v1/places/:placeId
```

Access:

```text
Public
```

### Create Tourist Place

```http
POST /api/v1/places
```

Access:

```text
Admin
```

### Update Tourist Place

```http
PUT /api/v1/places/:placeId
```

Access:

```text
Admin
```

### Delete Tourist Place

```http
DELETE /api/v1/places/:placeId
```

Access:

```text
Admin
```

---

## 9. Tourist Place Data Structure

A tourist place may contain:

```json
{
  "name": "Amber Fort",
  "slug": "amber-fort",
  "state": "Rajasthan",
  "city": "Jaipur",
  "category": "Heritage",
  "description": "A historic fort located in Jaipur.",
  "history": "Historical information about the destination.",
  "bestTimeToVisit": "October to March",
  "entryFee": "As applicable",
  "timings": "As applicable",
  "location": "Jaipur, Rajasthan",
  "mapLink": "https://maps.google.com/",
  "images": []
}
```

The exact database structure will be finalized during backend implementation.

---

## 10. Categories API

### Get All Categories

```http
GET /api/v1/categories
```

Access:

```text
Public
```

Initial categories:

- Heritage
- Nature
- Religious
- Adventure

### Get Category by ID

```http
GET /api/v1/categories/:categoryId
```

Access:

```text
Public
```

### Create Category

```http
POST /api/v1/categories
```

Access:

```text
Admin
```

### Update Category

```http
PUT /api/v1/categories/:categoryId
```

Access:

```text
Admin
```

### Delete Category

```http
DELETE /api/v1/categories/:categoryId
```

Access:

```text
Admin
```

---

## 11. Search and Filtering API

Tourist places will support search and filtering through query parameters.

Example:

```http
GET /api/v1/places?search=fort
```

Filter by state:

```http
GET /api/v1/places?state=rajasthan
```

Filter by city:

```http
GET /api/v1/places?city=jaipur
```

Filter by category:

```http
GET /api/v1/places?category=heritage
```

Multiple filters:

```http
GET /api/v1/places?state=rajasthan&city=jaipur&category=heritage
```

The API will return only destinations matching the supplied filters.

---

## 12. Pagination

Pagination will be used when a large number of destinations are available.

Example:

```http
GET /api/v1/places?page=1&limit=12
```

Possible response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "totalPages": 9
  }
}
```

Pagination will help reduce unnecessary data transfer and improve performance.

---

## 13. Authentication API

Authentication APIs will be used for administrative access.

### Admin Login

```http
POST /api/v1/auth/login
```

Example request:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

Successful authentication will return an authentication token.

The actual administrator credentials will not be stored in the source code.

---

## 14. Admin Registration

Public admin registration will not be enabled in the production application.

Administrator accounts will be created through a controlled process.

If registration is required during development, it will be protected and disabled before production deployment.

---

## 15. Authentication-Protected Requests

Protected administrative requests will include an authentication credential.

Example:

```http
Authorization: Bearer <token>
```

The backend will verify the token before processing protected operations.

---

## 16. Admin API Access

The following operations require administrator authorization:

```text
Create State
Update State
Delete State

Create City
Update City
Delete City

Create Tourist Place
Update Tourist Place
Delete Tourist Place

Create Category
Update Category
Delete Category
```

Public users will have read-only access to tourism information.

---

## 17. Standard Success Response

Successful API responses should follow a consistent structure.

Example:

```json
{
  "success": true,
  "message": "Tourist place fetched successfully",
  "data": {}
}
```

For lists:

```json
{
  "success": true,
  "message": "Tourist places fetched successfully",
  "data": []
}
```

Consistency makes API responses easier for the frontend to handle.

---

## 18. Standard Error Response

API errors will use a consistent structure.

Example:

```json
{
  "success": false,
  "message": "Tourist place not found",
  "error": {
    "code": "PLACE_NOT_FOUND"
  }
}
```

Sensitive backend information such as stack traces, database credentials, or internal implementation details will not be returned to users.

---

## 19. HTTP Status Codes

TravelBharat will use standard HTTP status codes.

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 400 | Bad request |
| 401 | Authentication required or invalid |
| 403 | Access forbidden |
| 404 | Resource not found |
| 409 | Conflict or duplicate resource |
| 422 | Validation error |
| 500 | Internal server error |

---

## 20. Validation Rules

The backend will validate data before creating or updating resources.

Examples:

### Tourist Place

Required:

- Name
- State
- City
- Category
- Description

### State

Required:

- Name

### City

Required:

- Name
- State

Invalid or incomplete requests will receive a validation error response.

---

## 21. API Security

The API layer will follow basic security practices.

These include:

- Authentication for protected routes
- Role-based authorization
- Password hashing
- Input validation
- Secure environment variables
- Controlled error responses
- Request validation
- Protection of sensitive admin operations

Security middleware will be added during backend implementation.

---

## 22. API Response and Frontend Handling

The React frontend will handle API states consistently.

```text
API Request
    ↓
Loading
    ↓
 ┌───────────────┐
 │               │
Success        Error
 │               │
 ↓               ↓
Display Data   Show Message
```

The frontend will also handle empty responses.

Example:

```text
No tourist places found for the selected filters.
```

---

## 23. API Documentation

The API design documented here will act as the initial API contract between frontend and backend development.

As implementation progresses, endpoint details may be expanded with:

- Request schemas
- Response schemas
- Authentication requirements
- Validation rules
- Example requests
- Example responses

A production-ready API documentation tool such as OpenAPI/Swagger may be introduced later if required.

---

## 24. Future API Extensions

The architecture allows additional APIs to be added in future versions.

Possible extensions include:

```text
/api/v1/maps
/api/v1/itineraries
/api/v1/reviews
/api/v1/recommendations
/api/v1/translations
```

These are outside the initial project scope and will not be implemented unless the project requirements are expanded.

---

## 25. API Design Principles

TravelBharat APIs will follow these principles:

1. RESTful endpoint design
2. Consistent naming conventions
3. Proper HTTP methods
4. Standard HTTP status codes
5. Consistent JSON responses
6. Secure authentication
7. Role-based authorization
8. Backend validation
9. Clear error handling
10. Scalable resource structure

---

## 26. Final API Overview

The initial TravelBharat API structure is:

```text
/api/v1
│
├── /auth
│   └── POST /login
│
├── /states
│   ├── GET
│   ├── POST
│   ├── PUT /:stateId
│   └── DELETE /:stateId
│
├── /cities
│   ├── GET
│   ├── POST
│   ├── PUT /:cityId
│   └── DELETE /:cityId
│
├── /places
│   ├── GET
│   ├── GET /:placeId
│   ├── POST
│   ├── PUT /:placeId
│   └── DELETE /:placeId
│
└── /categories
    ├── GET
    ├── POST
    ├── PUT /:categoryId
    └── DELETE /:categoryId
```

This API structure provides a clear foundation for implementing the TravelBharat backend and connecting it with the React frontend.

## Phase 6 Authentication APIs

### POST `/api/auth/login`

Authenticates an active admin/editor using email and password and returns a signed JWT access token.

### GET `/api/auth/me`

Requires `Authorization: Bearer <token>` and returns the current authenticated admin profile.

### Protected destination mutations

`POST /api/destinations`, `PUT /api/destinations/:slug`, and `DELETE /api/destinations/:slug` require a valid JWT and an `admin` or `editor` role.
