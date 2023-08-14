const express = require("express");
require("dotenv").config();

const { connection } = require("./db");
const { userRoute } = require("./route/user.route");
const { flightRoute } = require("./route/flight.route");
const { bookingRoute } = require("./route/booking.route");

const app = express();

app.use(express.json());

app.use("/user", userRoute);
app.use("/flight", flightRoute);
app.use("/booking", bookingRoute);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server started on ${process.env.PORT}`);
});
