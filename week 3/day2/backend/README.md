# Task Management API

A RESTful API for task management with user authentication built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- JWT-based authorization
- CRUD operations for tasks
- Input validation
- API documentation with Swagger
- CORS enabled

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Express Validator
- **Documentation:** Swagger UI
- **Security:** bcryptjs for password hashing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for logged-in user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id` - Partially update a task
- `DELETE /api/tasks/:id` - Delete a task

## API Documentation

Access the interactive API documentation at:
```
http://localhost:5000/api-docs
```

## Authentication

Include the JWT token in the Authorization header for protected routes:
```
Authorization: Bearer <your_jwt_token>
```

## Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Route handlers
├── docs/           # Swagger documentation
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── .env           # Environment variables
├── package.json   # Dependencies and scripts
└── server.js      # Application entry point
```

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm run docs` - Display documentation info

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | JWT signing secret | - |

## License

This project is licensed under the MIT License.