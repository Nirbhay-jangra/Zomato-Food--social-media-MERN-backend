const mongoose = require('mongoose')

let isConnected = false

async function connectDb(){
    // 1. Check if we are already connected. If yes, stop here and reuse it!
    if (isConnected) {
        console.log('Reusing existing MongoDB connection')
        return;
    }

    try {
        // 2. Only connect if we aren't already connected
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true;
        console.log('Connected To MongoDb')
    } catch(err) {
        console.error('Mongo Connection Error:', err)
    }
}

module.exports = connectDb