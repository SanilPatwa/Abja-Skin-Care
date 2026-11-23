# 🧴 Abja Skin Care CRM

A full-stack, production-ready Customer Relationship Management (CRM) web application designed for Abja Skin Care. Built with a React + TypeScript frontend and a Node.js + Express backend connected to a cloud-hosted Supabase PostgreSQL database.

---

## 🔗 Live Production Links

- **Backend API (Render):** `https://abja-skin-care.onrender.com`
- **Database (Supabase):** PostgreSQL Cloud Database

---

## 🚀 Tech Stack

### **Frontend**
- **Core:** React 18, TypeScript, Vite
- **HTTP Client:** Axios
- **Styling:** Modern Vanilla CSS (Glassmorphism & Micro-animations)

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Middleware:** CORS, Express JSON parser
- **Database Driver:** `pg` (node-postgres)

### **Database & Deployment**
- **Database:** Supabase (Cloud PostgreSQL)
- **Backend Hosting:** Render
- **Frontend Hosting:** Vercel
- **CI/CD:** Automated deployment via GitHub Webhooks

---

## ✨ Features

- **Full RESTful CRUD Operations:** Create, Read, Update, and Delete clients seamlessly.
- **Cloud Database Persistence:** Real-time persistence using relational PostgreSQL tables.
- **Dynamic Search & Filtering:** Instantly filter clients by business name, city, phone number, or client category.
- **Sanitized Parameterized Queries:** Fully protected against SQL Injection using parameterized `$1, $2` SQL queries.
- **Automated CI/CD:** Pushing code updates to GitHub automatically builds and deploys updates to production.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Request Body / Params | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | Health check & DB ping (keeps Render + DB active) | N/A | `200 OK` / `500` |
| `GET` | `/api/health` | Health check alias | N/A | `200 OK` / `500` |
| `GET` | `/api/clients` | Retrieve all clients | N/A | `200 OK` |
| `POST` | `/api/clients` | Create a new client | `{ name, type, phone, city }` | `201 Created` |
| `PUT` | `/api/clients/:id` | Update an existing client | Param: `:id`, Body: `{ name, type, phone, city }` | `200 OK` / `404` |
| `DELETE` | `/api/clients/:id` | Delete a client by ID | Param: `:id` | `200 OK` / `404` |

---

## ⏰ Keeping Render & Database Always Awake

Render's free tier spins down web services after 15 minutes of inactivity, causing ~50-60 second cold starts on the next request. Free cloud databases can also pause after prolonged inactivity.

To keep both Render and the database active 24/7:
1. Create a free account on [cron-job.org](https://cron-job.org) or [UptimeRobot](https://uptimerobot.com).
2. Create a monitor targeting:
   `https://abja-skin-care.onrender.com/health`
3. Set execution frequency to every **10 minutes** (HTTP `GET`).
4. Each request queries the database (`SELECT NOW()`), preventing cold boots and idle pauses.

---

## 🛠️ Local Development Setup

### **Prerequisites**
- Node.js installed
- Git installed
- Supabase PostgreSQL Database URI

### **1. Backend Setup**
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file inside backend/
echo DATABASE_URL=your_supabase_postgresql_connection_string > .env

# Run the backend server locally
node index.js
```
The backend will start running at `http://localhost:3000`.

### **2. Frontend Setup**
```bash
# In the root project folder
npm install

# Start the Vite development server
npm run dev
```
The React frontend will start running at `http://localhost:5173`.

---

## 🔒 Security Best Practices

- Environment variables (`.env`) are strictly ignored in `.gitignore` to prevent credential leaks.
- Parameterized SQL queries (`$1, $2...`) prevent SQL Injection attacks.
- Explicit CORS policies configured for frontend-backend cross-origin requests.

---

## 👤 Author

Developed by Sanil for **Abja Skin Care**.
