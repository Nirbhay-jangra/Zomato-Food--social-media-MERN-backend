const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./db/db.js'); // 1. Import your DB function here

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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://zomato-food-social-media-mern-front.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200); 
    }
    next();
});

app.use(cors(corsOptions)); 
app.use(express.json());
app.use(cookieParser());

// 2. FORCE DB CONNECTION MIDDLEWARE HERE (Before routes)
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (err) {
        res.status(500).json({ error: "Database connection failed" });
    }
});

// 3. Application Routes (Now safe, because DB will be initialized first)
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

module.exports = app;