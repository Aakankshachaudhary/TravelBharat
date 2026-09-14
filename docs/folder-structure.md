# TravelBharat — Project Folder & Code Architecture

## 1. Document Purpose

This document defines the folder structure and code organization for the TravelBharat application.

The structure is designed to keep the project:

- Maintainable
- Scalable
- Easy to understand
- Easy to test
- Easy to collaborate on
- Suitable for real-world full-stack development

The project will separate frontend and backend responsibilities.

---

## 2. High-Level Project Structure

TravelBharat will use a monorepo-style structure containing the frontend, backend, documentation, and project-level configuration.

```text
TravelBharat/
├── client/
├── server/
├── docs/
├── .gitignore
├── README.md
└── package.json
```

---

## 3. Frontend Structure

The frontend will be developed using React.

```text
client/
├── public/
└── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── layouts/
    ├── services/
    ├── hooks/
    ├── context/
    ├── utils/
    ├── routes/
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

The frontend will contain UI and client-side application responsibilities.

---

## 4. Assets Folder

```text
client/src/assets/
```

Purpose:

Stores frontend assets used by the application.

Examples:

- Images
- Icons
- Logos
- Static visual resources

Large production images should be optimized before being added to the project.

---

## 5. Components Folder

```text
client/src/components/
```

Purpose:

Contains reusable UI components.

Possible components include:

```text
components/
├── Navbar/
├── Footer/
├── SearchBar/
├── FilterPanel/
├── DestinationCard/
├── StateCard/
├── CategoryCard/
├── ImageGallery/
├── LoadingSpinner/
├── ErrorMessage/
└── EmptyState/
```

Components should be reusable rather than duplicated across multiple pages.

---

## 6. Pages Folder

```text
client/src/pages/
```

Purpose:

Contains complete application pages.

Possible public pages:

```text
pages/
├── Home/
├── States/
├── StateDetails/
├── CityDetails/
├── Places/
├── PlaceDetails/
└── Search/
```

Possible admin pages:

```text
pages/
└── admin/
    ├── Login/
    ├── Dashboard/
    ├── States/
    ├── Cities/
    ├── Places/
    └── Categories/
```

Each page will compose reusable components rather than containing all UI logic in one file.

---

## 7. Layouts Folder

```text
client/src/layouts/
```

Purpose:

Contains reusable page layouts.

Possible layouts:

```text
layouts/
├── PublicLayout.jsx
└── AdminLayout.jsx
```

`PublicLayout` will provide common public-site elements such as navigation and footer.

`AdminLayout` will provide the admin navigation and dashboard structure.

---

## 8. Services Folder

```text
client/src/services/
```

Purpose:

Contains frontend API communication logic.

Possible files:

```text
services/
├── api.js
├── authService.js
├── stateService.js
├── cityService.js
├── placeService.js
└── categoryService.js
```

API calls should be kept outside page components wherever practical.

This separation makes API logic easier to maintain and test.

---

## 9. Hooks Folder

```text
client/src/hooks/
```

Purpose:

Contains reusable React hooks.

Examples:

```text
hooks/
├── useAuth.js
├── useFetch.js
└── useDebounce.js
```

Custom hooks will be added only when they provide reusable application behavior.

---

## 10. Context Folder

```text
client/src/context/
```

Purpose:

Contains React Context providers for application-wide state where appropriate.

Possible context:

```text
context/
└── AuthContext.jsx
```

Global state should not be added unnecessarily.

Local component state should be preferred when global state is not required.

---

## 11. Utils Folder

```text
client/src/utils/
```

Purpose:

Contains small reusable utility functions.

Examples:

```text
utils/
├── formatDate.js
├── slugify.js
└── validation.js
```

Utilities should contain reusable logic rather than page-specific business logic.

---

## 12. Routes Folder

```text
client/src/routes/
```

Purpose:

Contains frontend route configuration.

Possible file:

```text
routes/
└── AppRoutes.jsx
```

Routes will define public and protected navigation paths.

Admin routes will be protected through authentication and authorization checks.

---

## 13. Backend Structure

The backend will use Node.js and Express.js.

```text
server/
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── validators/
├── seeders/
├── app.js
└── server.js
```

The backend will contain API, business logic, security, validation, and database responsibilities.

---

## 14. Config Folder

```text
server/config/
```

Purpose:

Contains application configuration.

Possible files:

```text
config/
├── db.js
└── env.js
```

`db.js` will manage the MongoDB connection.

`env.js` will centralize environment configuration where required.

Sensitive values will come from environment variables.

---

## 15. Models Folder

```text
server/models/
```

Purpose:

Contains MongoDB data models.

Possible models:

```text
models/
├── User.js
├── State.js
├── City.js
├── TouristPlace.js
└── Category.js
```

Models will define the structure and validation rules for stored data.

---

## 16. Controllers Folder

```text
server/controllers/
```

Purpose:

Contains request-handling logic for API endpoints.

Possible controllers:

```text
controllers/
├── authController.js
├── stateController.js
├── cityController.js
├── placeController.js
└── categoryController.js
```

Controllers will receive requests, coordinate required operations, and send responses.

Complex business logic should be moved to services where appropriate.

---

## 17. Routes Folder

```text
server/routes/
```

Purpose:

Defines API endpoints and connects them to controllers.

Possible files:

```text
routes/
├── authRoutes.js
├── stateRoutes.js
├── cityRoutes.js
├── placeRoutes.js
└── categoryRoutes.js
```

Routes should remain focused on endpoint definitions and middleware composition.

---

## 18. Middleware Folder

```text
server/middleware/
```

Purpose:

Contains reusable Express middleware.

Possible middleware:

```text
middleware/
├── authMiddleware.js
├── adminMiddleware.js
├── errorMiddleware.js
└── notFoundMiddleware.js
```

Middleware will handle cross-cutting concerns such as authentication, authorization, and centralized errors.

---

## 19. Services Folder

```text
server/services/
```

Purpose:

Contains reusable business logic and operations that should not be tightly coupled to route definitions.

Possible services:

```text
services/
├── authService.js
├── stateService.js
├── cityService.js
└── placeService.js
```

Services will be introduced when business logic becomes complex enough to justify separation.

---

## 20. Validators Folder

```text
server/validators/
```

Purpose:

Contains request validation rules.

Possible files:

```text
validators/
├── authValidator.js
├── stateValidator.js
├── cityValidator.js
└── placeValidator.js
```

Validation will ensure that invalid or incomplete data does not reach the business logic or database layer.

---

## 21. Utils Folder

```text
server/utils/
```

Purpose:

Contains reusable backend utility functions.

Possible utilities include:

```text
utils/
├── generateToken.js
├── apiResponse.js
└── asyncHandler.js
```

Only genuinely reusable utilities should be placed here.

---

## 22. Seeders Folder

```text
server/seeders/
```

Purpose:

Contains scripts for inserting initial or development data.

Possible seed data:

- States
- Cities
- Categories
- Sample tourist places
- Development admin account

Seed data will help create a repeatable development environment.

Production data will be handled carefully and will not be overwritten accidentally by development seed scripts.

---

## 23. Backend Entry Files

### app.js

Responsible for:

- Creating the Express application
- Registering middleware
- Registering API routes
- Configuring error handling

### server.js

Responsible for:

- Loading application configuration
- Connecting to the database
- Starting the HTTP server

Keeping application setup separate from server startup improves testability and maintainability.

---

## 24. Documentation Folder

```text
docs/
├── project-plan.md
├── ui-architecture.md
├── page-specification.md
├── design-system.md
├── sitemap-and-user-journeys.md
├── technical-architecture.md
├── api-design.md
├── folder-structure.md
└── deployment-and-documentation.md
```

The documentation folder contains project planning, architecture, API, and deployment documentation.

---

## 25. Root-Level Files

The project root will contain important configuration and documentation files.

```text
TravelBharat/
├── .gitignore
├── README.md
└── package.json
```

Additional configuration files may be added when required by the selected development tools.

---

## 26. Environment Files

Environment-specific configuration will be kept outside source code.

Example:

```text
server/
├── .env
└── .env.example
```

The `.env` file will contain actual local secrets and must not be committed to Git.

The `.env.example` file will contain placeholder names only.

Example:

```text
PORT=
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=
```

---

## 27. Separation of Responsibilities

The project will follow clear responsibility boundaries.

```text
Frontend
  ↓
UI + User Interaction + Client State
  ↓
API Layer
  ↓
Backend
  ↓
Business Logic + Security + Validation
  ↓
Database Layer
  ↓
MongoDB
```

The frontend will not contain database logic.

The backend will not contain presentation-specific UI logic.

This separation makes the application easier to maintain and scale.

---

## 28. Naming Conventions

Consistent naming will be followed throughout the project.

### React Components

Use PascalCase:

```text
DestinationCard.jsx
SearchBar.jsx
AdminLayout.jsx
```

### JavaScript Utilities and Services

Use camelCase:

```text
placeService.js
authService.js
generateToken.js
```

### Database Models

Use PascalCase:

```text
TouristPlace.js
State.js
Category.js
```

### Folders

Folder naming will remain consistent within each layer.

---

## 29. Code Organization Principles

The project will follow these principles:

1. Keep components focused on UI responsibilities.
2. Keep API calls inside service modules.
3. Keep database access inside backend layers.
4. Avoid duplicated code.
5. Prefer reusable components and functions.
6. Keep files focused on one primary responsibility.
7. Avoid unnecessary abstractions.
8. Validate external input.
9. Keep secrets outside source code.
10. Maintain a clear separation between frontend and backend.

---

## 30. Final Project Structure

The expected high-level structure after implementation will be:

```text
TravelBharat/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── routes/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── seeders/
│   ├── app.js
│   └── server.js
│
├── docs/
│   ├── project-plan.md
│   ├── ui-architecture.md
│   ├── page-specification.md
│   ├── design-system.md
│   ├── sitemap-and-user-journeys.md
│   ├── technical-architecture.md
│   ├── api-design.md
│   ├── folder-structure.md
│   └── deployment-and-documentation.md
│
├── .gitignore
├── README.md
└── package.json
```

This structure provides a clean foundation for implementing TravelBharat as a professional full-stack application while keeping the codebase organized and scalable.