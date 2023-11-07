const express = require("express")
const bookingController = require("../controllers/bookingController")
const authController = require("../controllers/authController")
const viewsController = require("../controllers/viewsController")


const router = express.Router() 


// ... other middlewares and routes

router.get('/checkout-session/:tourId', authController.protect, bookingController.getCheckoutSession)
router.get('/my-tours', bookingController.createBookingCheckout, authController.protect,  viewsController.getMyTours);


router
  .route('/')
  .get(authController.protect,authController.restrictTo('admin', 'lead-guide'),bookingController.getAllBookings)
  .post(authController.protect,authController.restrictTo('admin', 'lead-guide'),bookingController.createBooking);

router
  .route('/:id')
  .get(authController.protect,authController.restrictTo('admin', 'lead-guide'),bookingController.getBooking)
  .patch(authController.protect,authController.restrictTo('admin', 'lead-guide'),bookingController.updateBooking)
  .delete(authController.protect,authController.restrictTo('admin', 'lead-guide'),bookingController.deleteBooking);
  


module.exports = router