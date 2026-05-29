const express = require('express');
const { authUserMiddleware } = require('../middlewares/auth.middleware');
const {getFoodPartnerById} = require('../controllers/food-partner.controller.js')


const router = express.Router()

router.get('/:id', authUserMiddleware,getFoodPartnerById)

module.exports = router;