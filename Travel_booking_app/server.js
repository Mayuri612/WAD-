const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Travel Booking API is running 🚀");
});

// ROUTES
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

// AUTH ROUTES (only if you added login/signup)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// START SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});