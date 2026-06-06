# Task Manager Application

A full-stack Task Manager web application built using the MERN stack. The application allows users to register, log in securely, and manage their tasks through an intuitive dashboard.

## Live Demo

https://task-managing-website.netlify.app

---

## Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Create Tasks
* View Tasks
* Edit Tasks
* Delete Tasks
* Toggle Task Status (Pending / Completed)
* Search Tasks
* Logout Functionality
* Persistent Data Storage using MongoDB Atlas
* Responsive Dashboard Interface

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT (JSON Web Token)
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Netlify (Frontend)
* Render (Backend)

---

## Project Structure

```text
Task-Manager-Assignment
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   └── styles
│   ├── package.json
│   └── index.html
│
└── README.md
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/IamVarunnn/Task-Manager-Assignment.git
cd Task-Manager-Assignment
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Authentication Flow

1. User registers an account.
2. User logs in using email and password.
3. JWT token is generated on successful login.
4. Protected routes verify the token before granting access.
5. Users can manage only their own tasks.

---

## Author

**Gadipally Varun**

GitHub: https://github.com/IamVarunnn
