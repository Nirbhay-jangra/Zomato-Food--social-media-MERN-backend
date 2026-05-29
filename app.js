//creating server
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes.js')
const foodRoutes = require('./routes/foods.routes.js')
const foodPartnerRoutes = require('./routes/food-partner.routes.js')

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRoutes)
app.use('/api/food' , foodRoutes)
app.use('/api/food-partner',foodPartnerRoutes)
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

module.exports = app