const mongoose = require("mongoose")
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => { console.log("DB connection successfull")})




/* console.log(process.env)
 */
const port = process.env.PORT || 3000;
// 4) Start the server
//this callback function starts listening as soona as the server starts listening
const server= app.listen(port, () => {
  console.log('app running on port',port);
})


process.on("unhandledRejection", (err) => {
  console.log(err.message, err.name)
  server.close(() => {

    process.exit(1)
  })
})