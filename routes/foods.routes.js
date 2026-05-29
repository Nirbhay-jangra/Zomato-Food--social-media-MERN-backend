const express = require("express");
const { createFood,getFoodItems,likeFoodController,saveFood,getSavedFood} = require("../controllers/foodItems.controller");
const router = express.Router();
const {authFoodPartnerMiddleware,authUserMiddleware} = require("../middlewares/auth.middleware.js");
const multer = require("multer");            //for audio/video
 

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);
router.get('/'  ,authUserMiddleware, getFoodItems)
router.post('/like',authUserMiddleware,likeFoodController)
router.post('/save' , authUserMiddleware, saveFood)
router.get('/save' , authUserMiddleware , getSavedFood)


module.exports = router;
