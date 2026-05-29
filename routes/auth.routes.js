const express = require('express')
const {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
} = require('../controllers/auth.controllers.js')

// 1. IMPORT YOUR VERIFY TOKEN MIDDLEWARE HERE (adjust the path to wherever yours is)
const verifyToken = require('../middlewares/verifyToken.js') 

const router = express.Router()

router.post('/user/register' , registerUser );
router.post('/user/login' , loginUser);
router.post('/user/logout' , logoutUser)

// 2. PLUG IT IN RIGHT HERE AS THE SECOND ARGUMENT
router.get("/me", verifyToken, (req, res) => {
  return res.status(200).json({ 
    authenticated: true, 
    user: req.user // Now safely populated by your middleware
  });
});

// Food partner APIs
router.post('/food-partner/register', registerFoodPartner);
router.post('/food-partner/login' , loginFoodPartner)
router.get('/food-partner/logout' , logoutFoodPartner);

module.exports = router