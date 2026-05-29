const foodPartnerModel = require('../models/foodPartner.model');
const FoodPartnerModel = require('../models/foodPartner.model')
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const authFoodPartnerMiddleware = async(req ,res , next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message : 'Login First'})
    }

    try{

        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        
        const foodPartner = await foodPartnerModel.findById(decoded.id)
        req.foodPartner = foodPartner
        next()

    }catch(err){
        return res.status(401).json({message : 'invalid token'})
    }
}

const authUserMiddleware = async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message : 'please login first'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findById(decoded.id);
        req.user = user
        next()
        
    }catch(e){
        return res.status(401).json({
            message : 'Invalid token'
        })
    }
}

module.exports = {authFoodPartnerMiddleware,authUserMiddleware}