const Tour = require("./../models/tourModel")
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")
const factory = require("./handlerFactory")
const multer = require("multer")
const sharp = require("sharp")
//cutsom middleware to validate id
/* exports.checkID = (req,res,next,val) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status : "fail",
            message: "Invalid id"
        })
    }

    next()
} */

/* exports.checkBody = (req,res,next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: "fail",
            message: "Missing name or price"
        })
    }

    next()
} */
const multerStorage = multer.memoryStorage()

const multerFilter = (req,file,cb) => {
    //uploaded file is an image
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }else{
        cb(new AppError("Not an image. Please upload only images", 400  ), false)

    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


exports.uploadTourImages = upload.fields([
    {name: 'imageCover', maxCount: 1},
    {name: 'images', maxCount: 3},

])


exports.resizeTourImages = async (req,res,next) => {

    if(!req.files.imageCover || !req.files.images){
        next()
    }
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`
    await sharp(req.files.imageCover[0].buffer)
    .resize(2000,1333)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(`public/img/tours/${req.body.imageCover}`)


    req.body.images = []
    await Promise.all(
    req.files.images.map(async (file,i) => {
        const filename = `tour-${req.params.id}-${Date.now()}-${i+1}.jpeg`

        await sharp(file.buffer)
          .resize(2000,1333)
          .toFormat("jpeg")
          .jpeg({quality: 90})
           .toFile(`public/img/tours/${filename}`)

        req.body.images.push(filename)

    })
    )
    next()
}
//custom middleware to manipulate the query for the top 5 and cheapest results
exports.aliasTopTours = (req,res,next) => {
    req.query.limit = '5',
    req.query.sort = "-ratingsAverage,price"
    req.query.fields = "name,price,ratingsAverage,summary,difficulty"
    next()
}



exports.getAllTours = factory.getAll(Tour)

exports.getTour = factory.getOne(Tour, {path: 'reviews'})



exports.createTour = factory.createOne(Tour)


/* exports.deleteTour =catchAsync( async(req,res,next) => {
        const tour = await Tour.findByIdAndDelete(req.params.id, )

        if(!tour) {
            return next(new AppError('No tour found with that ID', 404))
         }

        //204 means no content becuase we send no data back
        res.status(204).json({
            status: "success",
            data: null
        })
    
})
 */

exports.deleteTour = factory.deleteOne(Tour)
exports.updateTour = factory.updateOne(Tour)

exports.getTourStats = catchAsync(async(req,res,next) => {

        const stats= await Tour.aggregate([
            {
                $match: {ratingsAverage : { $gte : 4.5 }}
            },{
                $group:  {
                    _id : '$difficulty',
                    numTours : {$sum : 1},
                    numRatings: {$sum : '$ratingsQuantity'},
                    avgRating: {$avg: '$ratingsAverage'},
                    avgPrice : { $avg : '$price'},
                    minPrice: { $min : '$price'},
                    maxPrice: { $max : '$price'},
                }
            },
            {
                $sort : {
                    avgPrice: 1
                }
            }
        ])

        res.status(200).json({
            status: "success",
            stats
        })


})


exports.getMonthlyPlan = catchAsync( async( req,res,next) => {
        const year= req.params.year *1
        const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match : {
                startDates : {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id : {$month : '$startDates'},
                numTourStarts: {$sum : 1},
                tours: {
                    $push: '$name'
                }
            }
        },
        {
            $addFields : {month : '$_id'}
        },
        {
            $project: {
                _id :0
            }
        },
        {
            $sort: {numTourStarts : -1}
        }
    ]
        )
        res.status(200).json({
            status: "success",
            plan
        })
    
})


exports.getToursWithin =catchAsync( async (req,res,next) => {
    const {distance, latlng, unit} = req.params
    const [lat, lng] = latlng.split(",")
    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1

    if(!lat || !lng) {
        next(new AppError('Please provide latitude and longitude in the format lat,lng', 400))
    }


    const tours=  await Tour.find({startLocation: {$geoWithin: { $centerSphere: [[lng,lat], radius]}}})

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data : {
            data: tours
        }
    })
})


exports.getDistances = catchAsync( async (req,res,next) => {
    const { latlng, unit} = req.params
    const [lat, lng] = latlng.split(",")

    const multiplier = unit === "mi" ? 0.000621371 : 0.001

    if(!lat || !lng) {
        next(new AppError('Please provide latitude and longitude in the format lat,lng', 400))
    }


    const distances = await Tour.aggregate([
        {
            $geoNear : {
                near: {
                    type: 'Point',
                    coordinates: [lng *1 , lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier : multiplier
            }
        },
        {
            $project : { //we want to keep only these two data
                distance: 1,
                name: 1
            }
        }
    ])


    res.status(200).json({
        status: 'success',
        data : {
            data: distances
        }
    })
})