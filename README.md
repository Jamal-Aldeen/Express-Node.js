
# NodeLab API

A simple RESTful API built with Node.js, Express, and MongoDB for managing users and posts.

---

## Features

- **User Management**:
  - Signup, login, and authentication with JWT.
  - CRUD operations for users (admin-only access for listing users).
- **Post Management**:
  - Create, read, update, and delete posts.
  - Posts are associated with users.
- **Security**:
  - Password hashing with bcrypt.
  - Rate limiting, CORS, and helmet for enhanced security.

---

## Live Demo

You can test the API live on Glitch:  
👉 [NodeLab API on Glitch]([https://your-glitch-project-name.glitch.me](https://tartan-elastic-freighter.glitch.me/))

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nodelab.git
   cd nodelab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory:
     ```env
     MONGO_URI=mongodb://localhost:27017/mogo
     PORT=3000
     JWT_SECRET=your_random_jwt_secret_key
     JWT_EXPIRES_IN=1h
     SALT_ROUNDS=10
     ```

4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### Users
- **Signup**: `POST /api/v1/users/signup`
- **Login**: `POST /api/v1/users/login`
- **Get All Users (Admin Only)**: `GET /api/v1/users`
- **Get User by ID**: `GET /api/v1/users/:id`
- **Update User**: `PUT /api/v1/users/:id`
- **Delete User**: `DELETE /api/v1/users/:id`

### Posts
- **Create Post**: `POST /api/v1/posts`
- **Get All Posts**: `GET /api/v1/posts`
- **Get Post by ID**: `GET /api/v1/posts/:id`
- **Update Post**: `PUT /api/v1/posts/:id`
- **Delete Post**: `DELETE /api/v1/posts/:id`

---

## Testing with Postman

1. **Signup**:
   - Endpoint: `POST /api/v1/users/signup`
   - Body:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "passwordConfirm": "password123"
     }
     ```

2. **Login**:
   - Endpoint: `POST /api/v1/users/login`
   - Body:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Save the token from the response.

3. **Access Protected Routes**:
   - Include the token in the `Authorization` header:
     ```
     Authorization: Bearer <JWT_TOKEN>
     ```

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Security**: bcrypt, helmet, rate limiting, CORS

---
### How to Deploy on Glitch

1. Go to [Glitch](https://glitch.com/).
2. Click **New Project** and select **Import from GitHub**.
3. Paste your repository URL (e.g., `https://github.com/your-username/nodelab`).
4. Add your `.env` variables in the `.env` file on Glitch.
5. Click **Refresh** to deploy your project.

