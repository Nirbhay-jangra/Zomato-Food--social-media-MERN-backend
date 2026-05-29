const FoodPartnerModel = require('../models/foodPartner.model.js')
const FoodModel = require('../models/foodItem.model.js')

const getFoodPartnerById = async(req, res)=>{
    const foodPartnerId = req.params.id 
    
    const foodPartner = await FoodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await FoodModel.find({foodPartner : foodPartner._id})

    if(!foodPartner){
        return res.status(404).json({message : 'Food Partner Not Found'})
    }
    res.status(200).json({
        message : "Food Partner Found" ,
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems : foodItemsByFoodPartner
        }
    })
}

module.exports = {getFoodPartnerById}