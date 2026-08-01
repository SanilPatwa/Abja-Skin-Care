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
| `GET` | `/api/clients` | Retrieve all clients | N/A | `200 OK` |
| `POST` | `/api/clients` | Create a new client | `{ name, type, phone, city }` | `201 Created` |
| `PUT` | `/api/clients/:id` | Update an existing client | Param: `:id`, Body: `{ name, type, phone, city }` | `200 OK` / `404` |
| `DELETE` | `/api/clients/:id` | Delete a client by ID | Param: `:id` | `200 OK` / `404` |

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
