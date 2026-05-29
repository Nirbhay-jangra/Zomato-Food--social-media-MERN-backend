const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    video : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    foodPartner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "FoodPartner",
    },
    likeCount :{
        type : Number,
        default : 0,
    },
    savesCount:{
        type: Number,
        default : 0,
    }
    
})

const FoodModel = mongoose.model('food', foodSchema);

module.exports = FoodModel;