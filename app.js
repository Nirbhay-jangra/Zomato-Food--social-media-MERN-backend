//creating server
const express = require('express')
const cors = require('cors')
const app = express()
const corsOptions = {
    origin: "https://zomato-food-social-media-mern-front.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// IMPORTANT: single unified CORS handler
app.use(cors(corsOptions));

// IMPORTANT: handle preflight properly
app.options("*", cors(corsOptions));
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes.js')
const foodRoutes = require('./routes/foods.routes.js')
const foodPartnerRoutes = require('./routes/food-partner.routes.js')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://zomato-food-social-media-mern-front.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRoutes)
app.use('/api/food' , foodRoutes)
app.use('/api/food-partner',foodPartnerRoutes)
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

module.exports = app