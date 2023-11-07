const express = require("express")
const userFavouritesController = require("../controllers/userFavouritesController")
const authController = require("../controllers/authController")

//router is a middleware and we use it on this route
//we create like sub-app
const router = express.Router()

router.route("/").get(authController.protect,userFavouritesController.getFav)
router.route("/:tourId").get(authController.protect,userFavouritesController.setFav)

module.exports = router
