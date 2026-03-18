const express = require("express");

const router = express.Router();

const seatController = require("../controllers/seatController");
const showController = require("../controllers/showController");
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:showId/seats", seatController.getSeatsForShow);
router.get("/available", showController.getAvailableShows);
router.post("/:showId/bookings", authMiddleware, bookingController.createBooking);

module.exports = router;