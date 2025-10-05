# MileApp Backend (Express.js)

Mock REST API built for the **MileApp Fullstack Developer Test**, implemented using **Express.js** and deployed on **Railway**.

---

## Live API
https://backend-mileapp-test.railway.app

---

## What I Built
This backend simulates a real-world REST API for task management.  
It provides:
- **Mock login system** with static user credentials
- **CRUD endpoints** for tasks
- **Search, sort, and pagination**
- **Auth middleware** that validates token from request headers
- **MongoDB index creation script** (requirement #3)

The API design mimics typical production architecture, separating routes, middleware, and mock data for better maintainability and clarity.

---

## Design Decisions

### Express.js
Chosen for its simplicity and speed to prototype REST APIs that is perfect for mock services and test environments.  
Express also aligns with fullstack JavaScript workflow (same language as frontend).

### Mock Data Storage
Data is stored in-memory (`mockData.js` and `mockUsers.js`) to simulate database behavior without external dependencies so that ensuring quick startup and zero setup complexity.

### Auth Middleware
A simple middleware checks the `Authorization` header for a static token:
```js
Authorization: Bearer mock-token-12345
```
This helps simulate a protected API flow similar to JWT-based systems.

### Pagination, Search, Sort
All handled server-side to mirror real backend patterns, making it easy to extend later for database use.

---

## Strengths of This Module
- **Clean modular structure** (`routes/`, `middleware/`, `utils/`)
- **Scalable foundation** that can easily integrate real DB later
- **Production-style error handling**
- **Mock authentication** that reflects real JWT pattern
- **Fully deployable and testable via REST tools or frontend**

---

## MongoDB Index Script (Requirement #3)

File: `db/indexes.js`

```js
// Example MongoDB index creation
db.tasks.createIndex({ title: 1 });   // Improve search performance on task title
db.tasks.createIndex({ status: 1 });  // Efficient filtering by status
```

### Why These Indexes?
- `title`: used frequently in **search queries** that improves text lookup speed.
- `status`: often filtered (e.g., "Pending", "Done") that speeds up query scans.

Together, they optimize two of the most common query patterns without over-indexing.

---

## Local Setup
```bash
cd backend
npm install
npm run dev
```

Server runs at:  
`http://localhost:5000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/login` | Mock login (returns token) |
| GET | `/tasks` | Get all tasks (with pagination & filter) |
| POST | `/tasks` | Add new task |
| PUT | `/tasks/:id` | Update existing task |
| DELETE | `/tasks/:id` | Delete task |

---

## 🧾 Mock Login Credentials
```json
{
  "username": "admin",
  "password": "password"
}
```

Returns:
```json
{
  "token": "mock-token-12345",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

---

## Deployment
- **Platform:** Railway  
- **URL:** https://backend-mileapp-test.up.railway.app  
- **Auto Deploy:** on GitHub push

---

## Summary
This backend was built to be:
- **Lightweight, testable, and realistic**
- **Easily replaceable with a real database layer**
- **Simple enough for quick iteration during fullstack development**
