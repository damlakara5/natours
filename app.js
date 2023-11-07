const express = require("express")
const morgan = require("morgan")
const path = require("path")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const cors = require("cors")

const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const bookingRouter = require("./routes/bookingRoutes")
const userFavouritesRouter = require("./routes/userFavouritesRoutes")
const viewRouter = require("./routes/viewRoutes")
const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorController")



//52.derste appi anlatıyor
const app = express()



  

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views') )
// 1)GLOBAL Middlewares
app.use(express.static(path.join(__dirname,`public`))) 
app.use(helmet())
app.set('trust proxy', true);

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

const limiter = rateLimit({
    max: 100,
    windowMiliseconds:  60 * 60 * 1000,
    message: 'Too many requests, please try again in an hour' 
})


app.use('/api',limiter)


//this express.json() is a middleware is just a funct that can modify the incoming request data
//use adds function inside of it to the middleware stack
app.use(express.json())
app.use(cookieParser())

//Data sanitization against noSQL query injection
app.use(mongoSanitize())
//Data sanitization against XSS

app.use(xss())

app.use(hpp({
    whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'difficulty', 'price'] // allow duplication for this field
}))

app.use(cors())
app.use(compression())

//app.use(express.static(`${__dirname}/public`))  //build in express middleware for we can get access to the static files from browser ( like images, html)

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString()
    next()

})

/* app.get("/", (req,res) => {

    //send method only sends string
  //  res.status(200).send("Hello from the server side")
  res.status(200).json({message:"Hello from the server side"})
})

app.post("/", (req,res) => {
    res.send("you can post")
}) */

//we get the data on the top level because it runs once and not block the event-loop



// 3) Routes

app.use('/', viewRouter)
app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/bookings", bookingRouter)
app.use("/api/v1/favorites", userFavouritesRouter)


//code reaches here only if not handled by any of our routes
app.all('*', (req,res,next) => {
   /*  res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server`
    }) */

  /*   const err = new Error(`Can't find ${req.originalUrl} on this server`)
    err.status = "fail"
    err.statusCode = 404 */

    //whatever we pass into next is error
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})

//if middleware function has four arguments express will know that it is a error handling middleware
app.use(globalErrorHandler)



module.exports = app



//same as below
/* app.route("/api/v1/tours")
    .get(getAllTours)
    .post(createTour)

app.route("/api/v1/tours/:id")
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

app.route("/api/v1/users")
    .get(getAllUsers)
    .post(createUser)

app.route("/api/v1/users/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)
 */
//app.get("/api/v1/tours", getAllTours)
//app.post("/api/v1/tours", createTour)
/* app.get("/api/v1/tours/:id",getTour )
app.patch("/api/v1/tours/:id", updateTour )
app.delete("/api/v1/tours/:id",deleteTour )  */