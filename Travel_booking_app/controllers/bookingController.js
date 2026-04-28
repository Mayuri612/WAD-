const Booking = require("../models/Booking");

// CREATE
exports.createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json(booking);
};

// READ
exports.getBookings = async (req, res) => {
  const data = await Booking.find();
  res.json(data);
};

// UPDATE
exports.updateBooking = async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE
exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking Deleted Successfully" });
};