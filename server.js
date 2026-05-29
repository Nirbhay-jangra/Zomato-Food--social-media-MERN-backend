//start server
console.log("SERVER FILE STARTED");

require('dotenv').config()
const app = require('./app.js')
const connectDb = require('./db/db.js')

connectDb()


// vercel uses its own port
// app.listen(3000,()=>{
//     console.log("Server is running at port 3000 ")

// })
