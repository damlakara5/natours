const mongoose = require("mongoose")
const Tour = require("./tourModel")


const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true,'Review can not be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required:[true,'Review can not be empty!']
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    tour :
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour',
            required:[true,'Review must belong to a tour!']

        }
    ,
    user : 
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required:[true,'Review must belong to a user!']

        }
    
},
{
    toJSON : {virtuals: true} , //whenever data converted to json virtuals be part of the output
    toObject : {virtuals: true} , //whenever data converted to json virtuals be part of the output
})

reviewSchema.pre(/^find/, function(next){
    //this == current query
   /*  this.populate({
        path:'tour', //name of the field we want to replace
        select : 'name'  //fields that we  want to show
    }).populate({
        path:'user', //name of the field we want to replace
        select : 'name photo'  //fields that we  want to show
    }) */
    this.populate({
        path:'user', //name of the field we want to replace
        select : 'name photo'  //fields that we  want to show
    }).populate({
        path: "tour",
        select: "name ratingsAverage"
    }) 
    next()
})

//static function on model, update average whenever the review added,deleted or updated and update the relevant tour
reviewSchema.statics.calcAverageRatings = async function(tourId){
    //this == current model, we have to call the aggregate function on the modal and this is why we use statics on the modal (so this will point to model)
    const stats = await this.aggregate([
        {
            $match: { tour: tourId} //we selected tour that we want to update
        },
        {
            $group : {
                _id: '$tour',
                nRating: {$sum : 1},
                avgRating: {$avg: '$rating'},
            }
        }
    ])


    if(stats.length > 0){
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage:stats[0].avgRating
        })
    }else{
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        })
    }
   

}
reviewSchema.index({tour: 1, user: 1},{
    unique: true  //each combination of the rour and the user has to be unique
})


//used post because we need to get the review AFTER saved to db
reviewSchema.post('save', function(){
   
   // this points to current review but this.constructor is the model = Review
   this.constructor.calcAverageRatings(this.tour)
})

//findByOneAndUpdate, findByOneAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next){
    //this == current query so we only have access to qquery but we need access to document
    //if we execute the query we get the doc    
    //we set new field (r) to "this" so we can retrieve it on the post
    this.r = await this.findOne( )
    next()
})

reviewSchema.post(/^findOneAnd/, async function(){
    await this.r.constructor.calcAverageRatings(this.r.tour)
    
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review