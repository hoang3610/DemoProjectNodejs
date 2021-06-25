const express = require('express')
const helmet  = require('helmet')
const morgan  = require('morgan')
const cors    = require('cors')
import path from "path";
import bodyParser from "body-parser";
const dotenv  = require('dotenv')
const rfs     = require('rotating-file-stream')

import connectDatabase from './src/configs/db.config'
dotenv.config()

connectDatabase()

const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

app.use(helmet())

const accessLogStream = rfs.createStream('access.log', {
    interval: "1d",
    path: path.join(__dirname, "log"),
})
app.use(isProduction ? morgan('combined', {stram: accessLogStream}) : morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api', require('./src/routes/router').default)

app.get('/', (req,res) => {
    res.json({
        message: "This is index page"
    })
})

app.get('*', (req,res) => {
    res.json({
        message: "This is index page"
    })
})

// Catch 404 Errors and forward to error handler
app.use((req,res,next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // respone to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => {
    console.log(`Server is starting on port: ${port}`)
})