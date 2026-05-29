console.log("SERVER FILE STARTED");

require('dotenv').config()
const app = require('./app.js')
const connectDb = require('./db/db.js')

// 1. REMOVE the global connectDb() call from here

// 2. Add this middleware so every incoming request waits for the DB to be ready
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (err) {
        res.status(500).json({ error: "Database initialization failed" });
    }
});

// 3. Export the app for Vercel's serverless handler to consume
module.exports = app;