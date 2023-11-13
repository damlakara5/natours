const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")
const APIFeatures = require("./../utils/apiFeatures")

//factory function is a function that returns another function (controller in this case)
//generalization of delereTour function for works every model
//factory function will return the async function immidately
exports.deleteOne = Model  => catchAsync( async(req,res,next) => {
    const doc = await Model.findByIdAndDelete(req.params.id, )

    if(!doc) {
        return next(new AppError('No document found with that ID', 404))
     }

    //204 means no content becuase we send no data back
    res.status(204).json({
        status: "success",
        data: null
    })

})

exports.updateOne = Model => catchAsync( async (req,res,next) => {

    //id of the object we want to change, data that we want to change, options
    const doc= await Model.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })

    console.log("req body",req.body )

    if(!doc) {
        return next(new AppError('No doc found with that ID', 404))
     }
     
    res.status(200).json({
        status: "success",
        data: {
            data: doc
        }
    })


})
exports.createOne = Model => catchAsync(async (req,res,next) => {

    //  const newTour = new Tour()
    //  newTour.save()

    const newDoc = await Model.create(req.body)
  
    res.status(201).json({
        status: "success",
         data: {
            data: newDoc
        } 
    })
  
  })
  exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

      /*  const doc = await Model.findById(req.params.id).populate('reviews') .populate({
        path:'guides', //name of the field we want to replace
        select : '-__v -passwordChangedAt'  //fields that we don't want to show
    }) */

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });



//   const tour = tours.find(el => el.id === id)

  });



  exports.getAll = Model => catchAsync(async (req,res,next) => {
 
    /*   //FILTERING
      const queryObj = {...req.query}
      const excludedFields = ["page","sort","limit", "fields"]
      excludedFields.forEach(el => delete queryObj[el])

      //on the mongodb we have to write manually {"duration":{"$gte":"5"}}
      //our query querObj has {"duration":{"gte":"5"}} so qw replaced gte to $gte
      let queryStr = JSON.stringify(queryObj)
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}` )

      let query =  Tour.find(JSON.parse(queryStr))  */

  //   const query = Tour.find().where("duration").equals(5).where("difficulty").equals("easy")

  //SORTING

 /*  if(req.query.sort){
      //sort(price ratingAverage)
      const sortBy = req.query.sort.split(",").join(" ")

      query = query.sort(sortBy)
  }else{
      //sort by default
      query = query.sort('-createdAt')
  } */

  //Field Limiting
  /* if(req.query.fields){
      //select(price ratingAverage)
      const fields = req.query.fields.split(",").join(" ")

      query = query.select(fields)
  }else{
      //sort by default
      // - (minus) is excluding, set everything but instead this
      query = query.select('-__v')
  } */


  //PAGINATION
 /*  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 10
  const skip = (page-1) * limit

  if(req.query.page){
      const numTours = await Tour.countDocuments()
      if(skip >= numTours){
          throw new Error("This page doesn't exist")
      }
  }

  //if the query is page=2 limit=10, we want to 11,20, so we skip the first 10 element
  query = query.skip(skip).limit(limit) */

  //to allow for nested get reviews on tour
  let filter;
  if (req.params.tourId) filter = { tour: req.params.tourId }
  if (req.params.userId) filter = { user: req.params.userId }


  //execute query
      const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate()
      const doc = await features.query

      res.status(200).json({
          status: "success",
          results: doc.length,
          data: {
              data: doc
          }
      }) 
   
})


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

}) */
