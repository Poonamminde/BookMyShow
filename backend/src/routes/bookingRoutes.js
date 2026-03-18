const express = require("express");

const router = express.Router();

const bookingController = require("../controllers/bookingController");

router.get(
  "/",
  bookingController.getBookedShows
);

module.exports = router;