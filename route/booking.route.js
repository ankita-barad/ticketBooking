const express = require("express");
const bookingRoute = express.Router();
const { BookingModel } = require("../model/booking.model");

//book a flight

bookingRoute.post("/api/booking", async (req, res) => {
  try {
    const { user, flight } = req.body;
    const newBooking = new BookingModel({ user, flight });
    await newBooking.save();
    res.status(201).send("Booked successfully");
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

//get all the bookings
bookingRoute.get("/api/dashboard", async (req, res) => {
  try {
    const Bookings = await BookingModel.find()
      .populate("user")
      .populate("flight")
      .exec();

    res.status(201).send({ Bookings });
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

//update the bookings
bookingRoute.patch("/api/dashboard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const booking = await BookingModel.findByIdAndUpdate(
      { _id: id },
      {
        user,
      }
    );
    res.status(201).send({ booking });
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

//delete the bookings
bookingRoute.delete("/api/dashboard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingModel.findByIdAndDelete({ _id: id });
    res.status(201).send("Deleted successfully");
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

module.exports = { bookingRoute };
