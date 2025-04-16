# 🏢 Apartment Listing App

A full-stack web application for managing and displaying apartment listings. Built with **Node.js**, **MySQL**, **Docker**, and **Next.js**.

---

## 🚀 Features

- Add and view apartment listings
- RESTful API for backend operations
- Database initialization with sample data
- Dockerized for smooth local development

---

## 🧰 Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Next.js
- **Database**: MySQL
- **DevOps**: Docker & Docker Compose

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AdhamHammoda/apartmentsTask
cd apartmentsTask
```

### 2. Set Up Environment Variables

Setup environment in back-end/config/db.js and make sure you have schema named apartments

#### Example:
```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=apartments
PORT=3306
```

### 3. Start the App with Docker Compose

```bash
docker-compose up --build
```

- **Frontend**: http://localhost:3000  
- **Backend API**: http://localhost:5000  
- **MySQL**: Internal port 3306

### 4. Database Initialization

When the backend starts:
- It waits until MySQL is ready
- Creates required tables
- Inserts sample apartment listings and projects

You can modify this behavior in `backend/initDB/init.js`.

---

## 📁 Project Structure

```
.
├── backend
│   ├── db.js
│   ├── initDB/
│   ├── index.js
│   └── ...
├── frontend
│   ├── pages/
│   ├── components/
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## 🐳 Docker Services

| Service   | Port    | Description               |
|-----------|---------|---------------------------|
| frontend  | 3000    | Next.js UI for listings   |
| backend   | 5000    | Node.js API server        |
| mysql     | 3306    | MySQL database            |

---

## 💡 Tips

- If port 3306 is in use locally, change it in `docker-compose.yml` and `.env`.
- Use `mysql` as the hostname (it's the service name in Docker).
- Restart containers easily:
  ```bash
  docker-compose down
  docker-compose up --build
  ```

---

## 📌 Roadmap

- User authentication (admin & visitors)
- Image uploads for listings
- Deploy to cloud (Render, Vercel, etc.)

---

