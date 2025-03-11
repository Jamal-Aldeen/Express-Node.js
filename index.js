const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("express-async-errors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const limiter = require("./middlewares/rate-limiter");

// Load environment variables
dotenv.config();

// Import routes and utilities
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const APIError = require("./util/APIError");
const errorHandler = require("./middlewares/errorhandler");
const auth = require("./middlewares/auth");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Log HTTP requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(mongoSanitize()); // Sanitize data against NoSQL injection
app.use(xss()); // Sanitize data against XSS attacks
app.use(hpp()); // Prevent HTTP parameter pollution
app.use(limiter); // Rate limiting

// Routes
const V1_PREFIX = "/api/v1";
app.use(`${V1_PREFIX}/users`, usersRoutes); // Public routes (e.g., login, register)
app.use(`${V1_PREFIX}/posts`, auth, postsRoutes); // Protect posts routes with JWT

// Root route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the API! Use /api/v1 endpoints.",
  });
});

// Not Found Handler
app.use((req, res, next) => {
  next(new APIError(`${req.method} ${req.path} is not found`, 404));
});

// Error Handler
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};

// Start the server
startServer();