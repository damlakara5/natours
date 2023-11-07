const Booking = require("../models/bookingModel")
const Tour = require("../models/tourModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.getOverview = catchAsync( async (req,res, next) => {
    //Get tour data from collection
    const tours = await Tour.find()
    //build templete
    //render template
    res.status(200).render('overview', {
        title: 'All tours',
        tours
    })
})

exports.getTour =catchAsync( async(req,res,next) => {
    //get the data,for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
      });
    //build template
      if(!tour){
        return next(new AppError('There is no tour with that name', 404))
      }
    //render template using data
    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour
    })
})

exports.getLoginForm = catchAsync(async(req,res) => {
//render template using data
        res.status(200)
        .set(
            'Content-Security-Policy',
            "connect-src 'self' http://127.0.0.1:3000/"
        )
        .render('login', {
            title: 'Log into your account',
        });
})

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
      title: 'Your account'
    });
  };


exports.getMyTours = catchAsync( async  (req,res) => {
  //Find all bookings
  const bookings = await Booking.find({user: req.user.id})
  //find tours with the returned ids
  const tourIDs = bookings.map(el => el.tour)
  const tours = await Tour.find({_id: { $in: tourIDs }})
    res.status(200).json({
      status: "success",
      results: tours.length,
      tours
    })

})