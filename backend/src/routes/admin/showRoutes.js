const express = require("express");

const router = express.Router();

const showController = require("../../controllers/showController");

const adminMiddleware = require("../../middleware/adminMiddleware");

router.use(adminMiddleware);

router.post("/",showController.createShow);

router.get("/",showController.getAllShows);

module.exports = router;