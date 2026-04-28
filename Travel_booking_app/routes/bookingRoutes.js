const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
} = require("../controllers/bookingController");

// CRUD Routes
router.post("/", createBooking);        // CREATE
router.get("/", getBookings);           // READ
router.put("/:id", updateBooking);      // UPDATE
router.delete("/:id", deleteBooking);   // DELETE

module.exports = router;