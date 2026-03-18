const express = require("express");
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");
const adminShowRoutes = require("./routes/admin/showRoutes");
const showRoutes = require("./routes/showRoutes");

const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

// enable CORS for frontend; set FRONTEND_URL in env to restrict origin
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
app.use(cors(corsOptions));


app.use("/api/auth", authRoutes);

app.use(authMiddleware);
app.use("/admin/shows", adminShowRoutes);
app.use("/shows", showRoutes);
app.use("/bookings", require("./routes/bookingRoutes"));

module.exports = app;