const express = require("express")
const cors = require('cors')
//const corsOptions = require("./config/corsOptions")
const app = express()

// settings
app.set('port', process.env.PORT || 3000)


// middleware
app.use(express.json())
app.use(cors())

// routes
app.use(require('./routes/users'))
app.use(require('./routes/authController'))
app.use(require('./routes/sendEmail'))
app.use(require('./routes/products'))


//app.get('/', cors(corsOptions), (req, res)=>{
app.get('/', cors(), (req, res)=>{
  //app.get('/', (req, res)=>{
  res.json('Welcome to carivest API')
})
// Starting server
app.listen(app.get('port'), ()=>{
  console.log('server on port', app.get('port'))
})