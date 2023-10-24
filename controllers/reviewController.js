const Review = require("../models/reviewModel");
const factory = require("./handlerFactory")

/* exports.createReview = catchAsync(async (req,res) => {
    if(!req.body.tour){
        req.body.tour = req.params.tourId
    }
    if(!req.body.user) {
        req.body.user = req.user.id //req.user is from protect middleware
    }
    const newReview = await Review.create(req.body)
   
    res.status(201).json({
        status : "success",
        data : {
           review: newReview
        }
    })
}) */

//we create a middleware for this part
exports.setTourUserIds = (req,res,next) => {
    if(!req.body.tour){
        req.body.tour = req.params.tourId
    }
    if(!req.body.user) {
        req.body.user = req.user.id //req.user is from protect middleware
    }
    next()
}

exports.getAllReviews = factory.getAll(Review)
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);