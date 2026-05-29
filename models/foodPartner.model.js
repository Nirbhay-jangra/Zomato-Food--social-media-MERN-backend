const mongoose = require('mongoose')

const foodPartnerSchema = mongoose.Schema({
    name : {
        required : true,
        type : String,
    },
    contactName : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required: true,
    },
    email :{
        required : true,
        type : String,
        unique : true,
    },
    password :{
        required : true,
        type : String,
    },
})



const foodPartnerModel = mongoose.model("FoodPartner",foodPartnerSchema)

module.exports = foodPartnerModel