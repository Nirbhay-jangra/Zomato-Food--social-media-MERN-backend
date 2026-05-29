const FoodModel = require("../models/foodItem.model")
const SaveModel = require('../models/save.model.js')
const storageService = require('../services/storage.service.js')
const {v4 : uuid}  = require('uuid')
const LikeModel = require('../models/likes.model.js')


const createFood = async(req ,res )=>{
       
    const fileUploadResult = await storageService.uploadFile(req.file.buffer , uuid())
    
    const foodItem = await FoodModel.create({
        name : req.body.name ,
        description : req.body.description,
        video : fileUploadResult.url,
        foodPartner : req.foodPartner._id

    })


    res.status(201).json({message :'Food item created succesfully',
        food : foodItem
    })
}

const getFoodItems = async(req,res)=>{
    const foodItems = await FoodModel.find()
    res.status(200).json({message : 'food fetched succesfully' , 
        foodItems,
    })
}

const likeFoodController = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({
        message: "foodId is required",
      });
    }

    const existingLike = await LikeModel.findOne({
      user: user._id,
      food: foodId,
    });

    // IF ALREADY LIKED → UNLIKE
    if (existingLike) {
      await LikeModel.deleteOne({
        user: user._id,
        food: foodId,
      });

      const updatedFood = await FoodModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: -1 } },
        { new: true }
      );

      return res.status(200).json({
        like: false,
        likeCount: updatedFood.likeCount,
        message: "Food unliked successfully",
      });
    }

    // IF NOT LIKED → LIKE
    const newLike = await LikeModel.create({
      user: user._id,
      food: foodId,
    });

    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    return res.status(200).json({
      like: true,
      likeCount: updatedFood.likeCount,
      message: "Food liked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const saveFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({ message: "foodId is required" });
    }

    const existingSave = await SaveModel.findOne({
      user: user._id,
      food: foodId,
    });

    // --- UNSAVE LOGIC ---
    if (existingSave) {
      await SaveModel.deleteOne({
        user: user._id,
        food: foodId,
      });

      // Use { new: true } to instantly get the newly updated doc back
      const updatedFood = await FoodModel.findByIdAndUpdate(
        foodId,
        { $inc: { savesCount: -1 } },
        { new: true } 
      );

      return res.status(200).json({
        saved: false,
        savesCount: updatedFood?.savesCount || 0,
      });
    }

    // --- SAVE LOGIC ---
    await SaveModel.create({
      user: user._id,
      food: foodId,
    });

    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodId,
      { $inc: { savesCount: 1 } },
      { new: true }
    );

    return res.status(200).json({
      saved: true,
      savesCount: updatedFood?.savesCount || 0,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSavedFood = async(req, res )=>{
    const user = req.user;                           //we can get it like this bcz we added it in authusermiddleweare
    const savedFoods = await SaveModel.find({user : user._id}).populate('food')    //to populate with actual data of food

    if(!savedFoods || savedFoods.length ===0){
        return res.status(404).json({message : 'No saved food found'})
    }
    res.status(200).json({
        message : "Food retrived succesfully",
        savedFoods
    })

}


module.exports = {createFood,getFoodItems,likeFoodController,saveFood,getSavedFood} 


