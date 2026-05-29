// creating server
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes.js');
const foodRoutes = require('./routes/foods.routes.js');
const foodPartnerRoutes = require('./routes/food-partner.routes.js');

const app = express();

const corsOptions = {
    origin: "https://zomato-food-social-media-mern-front.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// This handles global CORS AND pre-flight options perfectly on its own
app.use(cors(corsOptions)); 

// Global Request Parsers
app.use(express.json());

app.use(cookieParser());

// 3. Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

module.exports = app;