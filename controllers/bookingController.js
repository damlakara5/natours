const Tour = require("./../models/tourModel")
const Booking = require("./../models/bookingModel")
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")
const factory = require("./handlerFactory")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.getCheckoutSession = catchAsync( async(req,res,next) => {
//Get the currently booked tour

const tour = await Tour.findById(req.params.tourId)
//create checkout session

const session = await stripe.checkout.sessions.create({
    //info about the session
    payment_method_types: ["card"],
    success_url : `${req.protocol}://${req.get("host")}/my-tours/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    cancel_url : `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    //info about the products
    line_items : [{
        price_data: {
            unit_amount: tour.price * 100,
            currency: 'usd',
            product_data : {
                name: `${tour.name} Tour`,
                images: [`https://www.natours.dev/img/tours/${tour.imageCover}.jpg`],

            }
        }, //convert to cents
        quantity: 1,

    }],
    mode: "payment"
})

    //Send to client
    res.redirect(303, session.url);
})


exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
    const { tour, user, price } = req.query;
   
    if (!tour && !user && !price) return next();
    await Booking.create({ tour, user, price });
  
    res.redirect(req.originalUrl.split('?')[0]);
  });

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);