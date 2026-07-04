# 🚀 DevTinder Backend

A secure and scalable REST API for **DevTinder**, a developer networking platform where developers can discover, connect, and collaborate with one another.

Built using **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**, this backend powers user authentication, profile management, developer discovery, connection requests, and connection management.

---

## 🌐 Live API

**Backend URL:** _Coming Soon_

---

## 📌 Features

- 🔐 JWT-based Authentication
- 🍪 Secure Cookie Authentication
- 👤 User Registration & Login
- ✏️ Edit User Profile
- 🔍 Discover Developer Feed
- ❤️ Send Connection Requests
- 📩 Accept / Reject Requests
- 🤝 View Accepted Connections
- 🛡️ Protected Routes using Authentication Middleware
- 🌍 MongoDB Database Integration
- ⚡ RESTful API Architecture
- 🔒 Password Hashing with bcrypt

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- CORS
- Validator.js

---

# 📂 Project Structure

```text
src/
│
├── config/
│   └── database.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── user.js
│   └── connectionRequest.js
│
├── routes/
│   ├── auth.js
│   ├── profile.js
│   ├── request.js
│   ├── user.js
│   └── feed.js
│
├── utils/
│
└── app.js
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/kuku-kodes/devtinder-backend.git
```

Move into the project

```bash
cd devtinder-backend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

For production

```bash
npm start
```

---

# 🔧 Environment Variables

Create a `.env` file in the project root.

```env
PORT=7777

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

CLIENT_URL=http://localhost:5173
```

For production

```env
CLIENT_URL=https://your-vercel-app.vercel.app
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout user |

---

## Profile

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/profile/view` | View logged-in profile |
| PATCH | `/profile/edit` | Update profile |

---

## Feed

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/feed` | Get developer feed |

---

## Connection Requests

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/request/send/:status/:toUserId` | Send connection request |
| POST | `/request/review/:status/:requestId` | Accept or Reject request |

---

## User

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/user/request/received` | View received requests |
| GET | `/user/connections` | View accepted connections |

---

# 🔐 Authentication Flow

```text
User Login
      │
      ▼
Generate JWT Token
      │
      ▼
Store Token in HTTP Cookie
      │
      ▼
Protected Routes
      │
      ▼
Verify JWT Middleware
      │
      ▼
Access Granted
```

---

# 🗃️ Database Schema

## User

```text
User
│
├── firstName
├── lastName
├── emailId
├── password
├── age
├── gender
├── photoUrl
├── about
├── skills[]
└── timestamps
```

---

## Connection Request

```text
ConnectionRequest
│
├── fromUserId
├── toUserId
├── status
└── timestamps
```

---

# ▶️ Running the Project

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

---

# 🌍 Deployment

The backend is ready to deploy on services like:

- Render
- Railway
- Fly.io
- DigitalOcean
- AWS EC2

For deployment:

- Configure environment variables
- Use MongoDB Atlas
- Set the production `CLIENT_URL`
- Enable secure cookies (`secure: true`, `sameSite: "none"`)

---

# 🔮 Future Improvements

- 💬 Real-time chat using Socket.IO
- 🔔 Notifications
- 📹 Video Calling
- 📍 Location-based developer discovery
- 🔍 Advanced search & filters
- ⭐ Profile verification
- 🧠 AI-based developer recommendations
- 📈 Analytics Dashboard
- 📤 Image uploads with Cloudinary

---

# 🤝 Frontend Repository

The frontend for this project is available here:

**DevTinder Frontend**

https://github.com/kuku-kodes/devtinder-web

---

# 👨‍💻 Author

**Kaushlendra Kumar Verma**

- GitHub: https://github.com/kuku-kodes
- LinkedIn: https://linkedin.com/in/kaushlendra-kumar-verma-49b32328a/

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It motivates further improvements and helps others discover the project.