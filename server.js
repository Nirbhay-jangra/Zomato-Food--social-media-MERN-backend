require('dotenv').config();
const app = require('./app.js');

// Comment this back out for Vercel
// app.listen(3000, () => console.log("Local server running on port 3000"));

module.exports = app;