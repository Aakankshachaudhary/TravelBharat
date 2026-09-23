# 🇮🇳 TravelBharat – Explore India State by State

TravelBharat is a full-stack tourism information platform designed to help users explore India's states, cities, and tourist destinations through a structured and easy-to-navigate web application.

The project organizes tourism information such as destination descriptions, categories, best visiting time, location, entry fee, timings, nearby attractions, and images in one centralized platform.

## 🌐 Live Demo

**Live Website:** Coming Soon
**GitHub Repository:** [TravelBharat](https://github.com/Aakankshachaudhary/TravelBharat)

---

## 📌 Project Overview

Tourism information is often distributed across multiple websites and sources, making it difficult for travelers and students to find structured state-wise information.

TravelBharat addresses this problem by providing a centralized platform where users can:

- Explore Indian states and union territories
- Discover tourist destinations
- Search destinations by name
- Filter destinations by category
- View detailed destination information
- Explore related destinations
- Access destination images and travel information
- Navigate through a responsive interface

The project also includes an administrative system for managing tourism content.

---

## 🎯 Objectives

- Create a centralized tourism information platform for India
- Organize destinations state-wise and city-wise
- Provide structured and informative destination details
- Make tourism information easier to discover
- Promote awareness of lesser-known destinations
- Provide a scalable foundation for future tourism features
- Implement secure administrative content management

---

## ✨ Features

### 👥 User Features

- 🏠 Professional homepage
- 🗺️ Explore Indian states and union territories
- 📍 State-wise destination listings
- 🔎 Destination search
- 🏷️ Category-based filtering
- ↕️ Destination sorting
- 📖 Detailed destination pages
- 🖼️ Destination images
- 🌤️ Best time to visit
- 💰 Entry fee information
- 🕐 Timings
- 📌 Location information
- 🧭 Nearby attractions
- 🔗 Related destinations
- 📱 Responsive design

### 🔐 Admin Features

- Secure admin login
- JWT-based authentication
- Role-based authorization
- Admin dashboard
- Destination management
- Add destinations
- Edit destinations
- Delete destinations
- Search admin catalogue
- Destination statistics
- Protected API routes

---

## 🛠️ Technology Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Vite

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Security

- JWT
- Password hashing using Node.js crypto
- Protected admin routes
- Role-based authorization
- Environment variables for sensitive configuration

### Development Tools

- Git
- GitHub
- VS Code
- Git Bash
- Vercel
- Render
- MongoDB Atlas

---

## 🏗️ Project Architecture

```text
TravelBharat
│
├── client/
│   ├── public/
│   │   └── assets/
│   │
│   └── src/
│       ├── components/
│       ├── constants/
│       ├── data/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       └── App.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── server.js
│   │
│   └── package.json
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
│   ├── phase-7-production-quality.md
│   └── phase-8-deployment.md
│
├── render.yaml
├── .gitignore
└── README.md

