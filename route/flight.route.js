const express = require("express");
const flightRoute = express.Router();
const { FlightModel } = require("../model/flight.model");

//create a new Flight

flightRoute.post("/api/flights", async (req, res) => {
  try {
    const {
      airline,
      flightNumber,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;
    const newFlight = new FlightModel({
      airline,
      flightNumber,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });
    await newFlight.save();
    res.status(201).send("Flight created");
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

//get all the flights
flightRoute.get("/api/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.status(200).send({ flights });
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

//get the specific flight
flightRoute.get("/api/flights/:id", async (req, res) => {
  try {
    const flight = await FlightModel.findById(req.params.id);
    res.status(200).send({ flight });
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

//update the specific flight
flightRoute.put("/api/flights/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const {
      airline,
      flightNumber,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;
    const flight = await FlightModel.findByIdAndUpdate(
      { _id: id },

      {
        airline,
        flightNumber,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price,
      }
    );

    res.status(200).send({ flight });
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

//delete the specific file
flightRoute.delete("/api/flights/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await FlightModel.findByIdAndDelete({ _id: id });

    res.status(200).send("Deleted successfully");
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

module.exports = { flightRoute };
