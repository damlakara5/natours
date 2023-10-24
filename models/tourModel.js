const mongoose = require("mongoose")
const slugify = require("slugify")
const User = require("./userModel")

const tourSchema = new mongoose.Schema({
    name: { //this object is Schema type options
        type : String,
        required: [true, "A tour must have a name"] , //second one is the error string
        unique: true,
        trim: true,
        maxLength: [40, "A tour name must have less or equal then 40 chars"],
        minLength: [10, "A tour name must have more or equal then 10 chars"],
    //  validate: [validator.isAlpha, "Tour name must only contain characters"]
    },
    slug: String,
    duration: { //this object is Schema type options
        type : Number,
        required: [true, "A tour must have a duration"] , //second one is the error string
    },
    maxGroupSize: { //this object is Schema type options
        type : Number,
        required: [true, "A tour must have a group size"] , //second one is the error string
    },
    difficulty: { //this object is Schema type options
        type : String,
        required: [true, "A tour must have a difficulty"] , //second one is the error string,
        enum: {
            values: ["easy", "medium", "difficult"],  //values are available,
            message : 'Difficulty is either easy,medium,difficult'
        } 
    },
    ratingsAverage:  { //this object is Schema type options
        type : Number,
        default: 4.5,
        min : [1, "Rating must be above 1"],
        max: [5, "Rating must be below 5"],
        set: val =>  Math.round(val * 10) / 10
    },
    ratingsQuantity:  { //this object is Schema type options
        type : Number,
        default: 0
    },
    price:  { //this object is Schema type options
        type : Number,
        required: [true, "A tour must have a price"]  //second one is the error string
    },
    priceDiscount : {
        type: Number,
        validate : 
        {
            validator:  function(value){ //value is what the user input
                //this only points to current doc  on NEW document creation (not for update)
                return value < this.price // 100 < 200
            },
            message: 'Discount price ({VALUE}) should be below the price'
        }
       
    },
    summary: {
        type: String,
        trim: true,
        required : [true,"A tour must have a summary"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type : String,
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    createdAt : {
        type: Date,
        default: Date.now()
    },
    startDates : [Date],
    secretTour : {
        type: Boolean,
        default: false
    },
    startLocation : {
        //GeoJson
        type : {
            type: String,
            default: 'Point',
            enum : ['Point'] // all the possible options that this field can take
        },
        coordinates: [Number], // array of numbers
        address: String,
        description: String
    },
    //specifying an array of object this will create a new document inside of the parent document
    locations: [
        {
            type: {
                type: String,
                default : 'Point',
                enum: ['Point']
            },
            coordinates: [Number], // array of numbers
            address: String,
            description: String,
            day: Number
        }
    ],
   // guides : Array for embedding
   guides : [  //Array simply means this will be a new documenst
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User' 
        }

   ]
}, 
{
    toJSON : {virtuals: true} , //whenever data converted to json virtuals be part of the output
    toObject : {virtuals: true} , //whenever data converted to json virtuals be part of the output
})


//tourSchema.index({price: 1})
tourSchema.index({price: 1, ratingsAverage: -1}) //-1 desc order
tourSchema.index({slug : 1}) //-1 desc order
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual("durationWeeks").get(function() {
    return this.duration / 7
})

//virtual populate
tourSchema.virtual("reviews", {
    ref: "Review",
    foreignField : "tour", //name of the which field did we store the tour id on other model
    localField : "_id"  //field name in this model
})

//DOCUMENT MIDDLEWARE
//mongoose middleware it is gonna run before an actual event, in this case the save event
//runs before .save() and .create()
tourSchema.pre('save', function(next){
    //this == currently processed document, document being saved
    this.slug = slugify(this.name, {lower : true})

    next()
})

//embed the user to tour model
/* tourSchema.pre('save', async function(next){

   const guidesPromises =  this.guides.map( async id => await User.findById(id) )
   this.guides = await Promise.all(guidesPromises)

    next()
}) */

//post middleware, post middleware function executed after all the pre middleewares have completed
tourSchema.post('save', function(doc,next){
    next()
})


//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function(next){
    //this == current query
    this.find({secretTour: {$ne: true}})
    next()
})

tourSchema.pre(/^find/, function(next){
    //this == current query
    this.populate({
        path:'guides', //name of the field we want to replace
        select : '-__v -passwordChangedAt'  //fields that we don't want to show
    })
    next()
})

tourSchema.post(/^find/, function(docs,next){
    //this == current query

    next()
})



//AGGREGATION MIDDLEWARE
/* tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({
        $match: {secretTour: {$ne: true}}
    })
    //entire aggregation pipeline
    console.log(this.pipeline())
    next()
}) */

const Tour = mongoose.model("Tour", tourSchema)

module.exports = Tour