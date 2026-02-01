# inventory-backend
# Inventory Backend

A production-style **Node.js + TypeScript backend** for an inventory and order management system, designed to demonstrate real-world backend engineering patterns used in modern SaaS and platform teams.

This project focuses on **clean architecture, data integrity, performance, and reliability**, rather than frontend concerns or UI.

---

## 🚀 Tech Stack

- **Node.js (v22)**
- **TypeScript**
- **Express**
- **PostgreSQL** (planned)
- **Prisma ORM** (planned)
- **Redis** (planned)
- **BullMQ** (planned)
- **JWT & Cookie-based Authentication** (planned)

---

## 🎯 Project Goals

This backend is being built to showcase:

- Clean and scalable project structure
- RESTful API design with proper HTTP semantics
- Centralized error handling and logging
- Secure authentication and authorization
- Robust database schema design
- Caching strategies for performance
- Background job processing for async workloads
- Production-ready backend practices

---

## 📁 Project Structure

src/
├── app.ts          # Express app configuration
├── server.ts       # Application entry point
├── config/         # Environment & app configuration
├── modules/        # Feature-based modules (auth, inventory, orders)
├── middlewares/    # Custom Express middlewares
└── utils/          # Shared utilities

---

## 🛠️ Getting Started

### Prerequisites
- Node.js **v22**
- npm

### Installation

```bash
git clone <repo-url>
cd inventory-backend
npm install