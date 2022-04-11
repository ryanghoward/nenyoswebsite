require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
// route import
const authRoutes = require('./routes/auth')
const growerRoutes = require('./routes/grower')
const orchidRoutes = require('./routes/orchid')

// application
const app = express()

// grower db
mongoose.connect(process.env.DATABASE_CLOUD, {
        useNewUrlParser: true
    }).then(() =>
    console.log("Connected to Yer MOM!"))
    .catch((err) =>
        console.log("DB Error => ", err))

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: `${process.env.CLIENT_URL}`
    }))
}

//routes middleware
app.use('/growers/signup', authRoutes)
app.use('/growers', growerRoutes)
app.use('/orchids', orchidRoutes)


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Orchids Blooming on Plant ${port}`)
})