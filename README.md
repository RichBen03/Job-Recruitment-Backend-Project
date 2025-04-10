# 📦 Job Recruitment Backend API

This is a **Node.js and Express-based backend** system for a Job Recruitment platform. It allows **employers to post jobs** and **jobseekers to apply**, with support for **authentication**, **role-based access control**, **secure file uploads**, and **advanced filtering**.

---

## 📁 Project Structure

```bash
├── controllers/        # Business logic for routes
├── middleware/         # Auth and access control
├── models/             # MongoDB schemas via Mongoose
├── routes/             # API endpoints
├── utils/              # Helpers like error handling, file uploads
├── config/             # DB connection and environment config
├── .env                # Environment variables (not committed)
├── server.js           # Entry point
```

---

## ⚙️ Tech Stack

- **Node.js + Express.js** - RESTful API Server
- **MongoDB + Mongoose** - NoSQL database with schema support
- **JWT** - Authentication
- **BcryptJS** - Password hashing
- **Multer + Cloudinary** - Resume file uploads
- **Helmet, Rate-limit, Mongo-sanitize** - Security middleware

---

## 🧱 Architecture

This project follows a **Modular MVC (Model-View-Controller)** pattern with the following layers:

- **Models**: Define data structure (`User`, `Job`, `Application`)
- **Controllers**: Contain route logic (CRUD, Auth, Search)
- **Routes**: Maps HTTP methods and paths to controllers
- **Middleware**: JWT auth, role-checking, error handling
- **Utils**: Cloudinary config, custom error class, query utilities

---

## 🔐 Authentication & Roles

- **JWT Tokens** issued on login/registration
- Middleware restricts access based on `jobseeker` or `employer`
- Passwords hashed with Bcrypt

---

## 📤 File Uploads

- Resumes are uploaded via `POST /api/upload/resume`
- Uses Cloudinary for storage (PDF, DOC, DOCX)

---

## 📌 Endpoints Overview

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and receive token

### Jobs
- `POST /api/jobs` - Post job (employer only)
- `GET /api/jobs` - List all jobs with filtering, pagination
- `GET /api/jobs/:id` - Get single job with applicants

### Applications
- `POST /api/applications` - Apply to a job (jobseeker only)
- `GET /api/applications` - View submitted applications

### Uploads
- `POST /api/upload/resume` - Upload a resume

---

## 🧪 Features

- Role-based route protection
- Query filtering, sorting, pagination (via `utils/apiFeatures.js`)
- Centralized error handling (`utils/appError.js`)
- Custom `auth.js` middleware for verifying JWT and roles
- Prevents injection attacks using `express-mongo-sanitize`
- Rate limiting via `express-rate-limit`

---

## 🔧 Getting Started

### 1. Clone and Install
```bash
git clone https://github.com/yourusername/job-recruitment-api.git
cd job-recruitment-api
npm install
```

### 2. Configure Environment
Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-recruitment-db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
```

### 3. Run Server
```bash
npm run dev
# or
node server.js
```

---

## ✅ Future Improvements
- Admin panel & dashboards
- Email verification and password reset
- Tests using Jest + Supertest
- Logging and monitoring (Winston + Sentry)

---

## 📃 License
MIT - Open to use and adapt

---

## 🤝 Contributing
PRs and suggestions are welcome. Please open an issue to discuss before contributing major changes.

---

## 👨‍💻 Author
Rich Mwendwa

---

## 📬 Contact
richben@gmail.com

---

_This project is a great starting point for aspiring backend developers building secure, scalable APIs._
