const mongoose = require('mongoose')


let isConnected = false

async function connectDb(){
    try{
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true;
    console.log('Connected To MongoDb')
    }catch(err){
        console.error(err)
    }
}


module.exports = connectDb